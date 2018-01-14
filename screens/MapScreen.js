import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchJobs} from '../actions';
import {Text, View, ActivityIndicator} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {MapView} from 'expo';

class MapScreen extends Component {
    static navigationOptions = {
        title : 'Map',
        tabBarIcon : ({tintColor}) => {
                return <Icon name="my-location" color={tintColor} size={30}/>;
            }
    }
    state = {
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta:  0.09
        },
        mapLoaded: false //for andriod
    }
    componentDidMount(){
        this.setState({mapLoaded: true});
    }
    onRegionChangeComplete(region){
        this.setState({region});
    }
    onButtonFetchPress(){
        this.props.fetchJobs(this.state.region, this.props.navigation.navigate);
    }
    render(){
        // to solve andriod issue
        if(!this.state.mapLoaded){
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" /> 
                </View>
            );
        }
        return(
            <View style={{flex:1}}>
                <MapView
                    style={{flex:1}}
                    //region={this.state.region}
                    initialRegion={this.state.region}
                    onRegionChangeComplete = {this.onRegionChangeComplete.bind(this)}
                />
                <View style={styles.ButtonStyle}>
                    <Button 
                        title='Fetch Jobs'
                        large
                        backgroundColor='#009688'
                        icon={{name: 'search'}}
                        onPress={this.onButtonFetchPress.bind(this)}
                    />
                </View>
            </View>
        );
    }
}
const styles = {
    ButtonStyle: {
        position: 'absolute',
        bottom: 20,
        left:0,
        right:0
    }
}


export default connect(null, {fetchJobs})(MapScreen);