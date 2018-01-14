import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import {connect} from 'react-redux';
import {facebookLogin} from '../actions';


class AuthScreen extends Component {
    componentDidMount(){
        //AsyncStorage.removeItem('fb_token');
    }
    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps);
    }
    onAuthComplete(props){
        if(props.token){
            props.navigation.navigate('main');
        }
    }
    onButtonPress(){
        this.props.facebookLogin();
        this.onAuthComplete(this.props); 
    }
    render(){
        return(
            <View style={{flex:1,justifyContent: 'center', alignItems: 'center', backgroundColor: '#03a9f4'}}>
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    raised
                    light
                    style={{width: 300}}
                    onPress={this.onButtonPress.bind(this)}

                />
            </View>
        );
            
    }
}


const mapStateToProps = ({auth}) => {
    return {
        token : auth.token
    }
}


export default connect(mapStateToProps, {facebookLogin})(AuthScreen);