import {Permissions, Notifications} from 'expo';
import {AsyncStorage} from 'react-native';
import axios from 'axios';


const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    //check if there a previous token saved in local storage
    let prevToken = await AsyncStorage.getItem('push_token');
    if(prevToken){
        return;
    }
    //if not ask for permission to send the user a notifications
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    //user refuse to give us a permission to send a notifications
    if(status !== 'granted'){
        return;
    }
    //generate a push token 
    let token = await Notifications.getExpoPushTokenAsync();
    
    //save token in the backend
    await axios.post(PUSH_ENDPOINT, {token: { token }});

    //save token in local storage
    await AsyncStorage.setItem('push_token', token);

    //then we going to import this func in app.js and call it 

}