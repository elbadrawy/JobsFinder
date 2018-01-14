import _ from 'lodash';
import { AppLoading } from 'expo';
import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import Slides from '../components/Slides';
import {welcom_screen} from '../actions';


const SLIDE_DATA = [
    {text: "Welcome to jobApp", color:'#03a9f4'},
    {text: "Set your location, then swipe away", color:'#009688'},
    {text: "We have more than company looking up for U", color:'#03a9f4'}
];
class WelcomeScreen extends Component {
    state = {token: null}
    async componentDidMount(){
        let token = await AsyncStorage.getItem('fb_token');
        if(token){
            this.props.navigation.navigate('main');
        }else{
            this.setState({token: false});
        } 
    }

    onSlidesComplete(){
        return this.props.navigation.navigate('auth');
    }
    render(){
        if(_.isNull(this.state.token)){
            return <AppLoading />
        }
        return(
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)}/>
        );
    }
}


export default WelcomeScreen;