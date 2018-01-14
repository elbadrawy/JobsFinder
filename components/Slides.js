import React, {Component} from 'react';
import {Text, View, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
class Slides extends Component {
    renderLastSlide(index){
        return (index === this.props.data.length -1 ? 
                <Button 
                    raised
                    buttonStyle={styles.ButtonStyle} 
                    title="Onwards!"
                    onPress={this.props.onComplete} 
                    /> : null);
    }
    renderData(){
        const {data} = this.props;
        return data.map((slide, index) => {
            return ( 
                    <View key={index} style={[styles.ContainerStyle, {backgroundColor:slide.color}]}>
                        <Text style={styles.TextStyle}>{slide.text}</Text>
                        <View style={{marginTop: 25}}>
                            {this.renderLastSlide(index)}
                        </View>
                    </View>
            );
        });
    }
    render(){
        return(
            <ScrollView
                horizontal
                style={{flex: 1}}
                pagingEnabled
            > 
                {this.renderData()}
            </ScrollView>
        );
    }
}

const styles = {
    ContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        paddingRight: 20,
        paddingLeft: 20
    },
    TextStyle: {
        color: 'white',
        fontSize: 30,
    },
    ButtonStyle: {
        backgroundColor: '#0288D1',
    }

}

export default Slides;