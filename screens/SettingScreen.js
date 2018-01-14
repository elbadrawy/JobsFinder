import React, {Component} from 'react';
import {Text, View, Platform} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {ResetJob} from '../actions'

class SettingScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        },
        tabBarIcon : ({tintColor}) => {
            return <Icon name="favorite" color={tintColor} size={30}/>;
        },
    }
    render(){
        return(
            <View style={{flex:1}}>
                <Text
                    style={{marginBottom: 25, marginTop: 15, marginLeft: 10, marginRight: 10, fontSize: 20, fontWeight: 'bold'}}
                >
                    Reset Your Review Jobs You Saved
                </Text>
                <Button 
                    title='Reset Jobs!'
                    large
                    backgroundColor='#F44336'
                    onPress={() => this.props.ResetJob()}
                    icon={{name: 'delete-forever'}}
                 />
            </View>
        );
    }
}



export default connect(null, {ResetJob})(SettingScreen);