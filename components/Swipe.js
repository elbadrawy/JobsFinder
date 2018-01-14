import React from 'react';
import { View,
         Animated,
         PanResponder,
         Dimensions,
         Text,
         LayoutAnimation,
         UIManager,
         Platform
        } from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_DETECT = 0.25 * SCREEN_WIDTH;
const TIME_TO_GO   = 250;

class Swipe extends React.Component {
    static defaultProps= {
        onSwipeRight: () => {}, 
        onSwipeLeft: () => {},
        keyProp: 'id'
    };

    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponser = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy});
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_DETECT){
                    this.forceSwipe(true);
                }else if(gesture.dx < -SWIPE_DETECT){
                    this.forceSwipe(false);
                }else{
                    this.resetPosition();
                }
            }
        });
        this.state = {panResponser, position, index:0};
    }

    componentWillUpdate(){
        //if this function (UIManager.setLayoutAnimationEnabledExperimental) exist so call it with true 
        //for android
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({index: 0});
        }
    }

    forceSwipe(right){
        Animated.timing(this.state.position, {
            toValue:{x:right ? SCREEN_WIDTH : -SCREEN_WIDTH , y:0},
            duration: TIME_TO_GO
        }).start(() => this.onSwipeComplete(right));
    }

    onSwipeComplete(right){
        const {onSwipeRight, onSwipeLeft, data} = this.props;
        const item = data[this.state.index];
        right ? onSwipeRight(item) : onSwipeLeft(item) ;
        //only only position state we can edit on it without setState func.
        this.state.position.setValue({x:0, y:0})
        this.setState({index: this.state.index + 1});
    }

    resetPosition(){
        Animated.spring(this.state.position, {
            toValue: {x: 0, y: 0}
        }).start();
    }
    getCardStyle(){
        const {position} = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            outputRange: ['-80deg', '0deg', '80deg'],
          }); 
        return {
            ...position.getLayout(),
            transform: [{rotate}]
        }
    }
    renderCard(){
        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards();
        }
        const deck = this.props.data.map((item, i) => {
                if(!item.longitude){
                    item.longitude = -122,
                    item.latitude  = 37
                }
                if(i < this.state.index){
                    return null;
                }
                if (i === this.state.index){
                    return (
                        <Animated.View 
                            key={item[this.props.keyProp]}
                            style={[this.getCardStyle(), styles.CardStyle]}
                            {...this.state.panResponser.panHandlers}
                        >
                            {this.props.renderCard(item)}
                        </Animated.View>
                    )
                }
            return (
                <Animated.View key={item[this.props.keyProp]} style={[styles.CardStyle, {top: 10 * (i - this.state.index), zIndex:-i}]}>
                        {this.props.renderCard(item)}
                </Animated.View>
                );
            
        });
        return Platform.os === 'android' ? deck : deck.reverse();

    }
    render() {
        return(
        <View>
             {this.renderCard()}
        </View>
        );
    }
}


const styles = {
    CardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    }
}

export default Swipe;