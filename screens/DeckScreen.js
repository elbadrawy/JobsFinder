import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Platform} from 'react-native';
import {MapView} from 'expo';
import {Card, Button, Icon} from 'react-native-elements';
import Swipe from '../components/Swipe';
import {LikeJob} from '../actions/job_actions';


class DeckScreen extends Component {
    static navigationOptions = {
        title : 'Jobs',
        tabBarIcon : ({tintColor}) => {
                return <Icon name="description" color={tintColor} size={30}/>;
            }
    }
    renderCard (job) {
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta:0.02,
            latitudeDelta:0.045
        }
            return(
                <Card title={job.jobtitle}>
                    <View style={{height: 300}}>
                        <MapView
                            style={{flex:1}}
                            scrollEnabled={false}
                            cacheEnabled = {Platform.os === 'android'} // as image not a map for preformance
                            initialRegion={initialRegion}
                        >
                            <MapView.Marker 
                                coordinate={{longitude: job.longitude,latitude: job.latitude}}
                            />
                        </MapView>
                    </View>
                    <View style={styles.detailWrapper}>
                        <Text style={styles.italics}>{job.company}</Text>
                        <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
                    </View>
                    <View style={{height: 100}}>
                        <Text>
                            {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                        </Text>
                    </View>
                </Card>
            );
                
    }
    renderNoMoreCards = () => {
        return (
            <Card title="No More Jobs">
                <Button 
                    title='Back To Map'
                    icon={{name: 'my-location'}}
                    large
                    backgroundColor='#03a9f4'
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }
    render(){
        return(
            <View style={{marginTop: 10}}>
                <Swipe 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.LikeJob(job)}
                    keyProp='jobkey'
                />
            </View>
        );
    }
}

const styles = {
    detailWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    italics : {
        fontStyle: 'italic'
    }
}


const mapStateToProps = ({jobs}) => {
    return {
        jobs: jobs.results
    }
}


export default connect(mapStateToProps, {LikeJob})(DeckScreen);