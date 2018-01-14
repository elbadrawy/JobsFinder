import React from 'react';
import {Notifications} from 'expo';
import { StyleSheet, Text, View , Alert} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import store from "./store";
import registerForNotifications from './services/push_notifications';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';

export default class App extends React.Component {
  componentDidMount(){
    //call the func we made to chick or generate the token of push notifications
    registerForNotifications();
    //add listener call back func. call every time user receive a notification
    Notifications.addListener((notification) => {
      //take text and orgin from notification
      const {data: { text }, origin } = notification;
      //check if origin === received and there are some text
      //note origin change from inside app or outside and from platform to other 
      if(origin === 'received' && text){
        //alert user for our notification contain (head, description, dismiss button)
          Alert.alert(
            //this the place to do any thing navigate user into app or update our state
            //from notification
            'New Push Notification',
            text,
            [{text: 'Ok.'}]
          );
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: {screen: WelcomeScreen},
      auth: {screen: AuthScreen},
      main: {
        screen: TabNavigator({
          map: {screen: MapScreen },
          deck:{screen: DeckScreen},
          review: {
            screen: StackNavigator({
              review: {screen: ReviewScreen},
              setting: {screen: SettingScreen}
            })
          }
        }, {
          tabBarOptions: {labelStyle : {fontSize: 12}},
          tabBarPosition: 'bottom',
          swipeEnabled: false
        })
      }
    },{
          navigationOptions: {
            tabBarVisible: false
          }
      });
    
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
