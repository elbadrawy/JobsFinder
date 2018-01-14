import React, {Component} from 'react';
import {Text, View, Platform, ScrollView, Linking} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';


class ReviewScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title:'Review Jobs',
        tabBarIcon : ({tintColor}) => {
            return <Icon name="favorite" color={tintColor} size={30}/>;
        },
        headerRight: (
        <Button 
            title='Settings'
            onPress={() => navigation.navigate('setting')} 
            backgroundColor="rgba(0,0,0,0)"
            color="rgba(0,122,255,1)"
            />
        ),
        headerStyle: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }

    })
    
    renderLikedJobs(){
        return this.props.likes.map(job => {
            const initialRegion= {
                longitude: job.longitude,
                latitude: job.latitude,
                longitudeDelta:0.02,
                latitudeDelta:0.045
            }
            return (
                    <Card key={job.jobkey} title={job.jobtitle}>
                        <View style={{height: 100}}>
                            <MapView
                                style={{flex:1}}
                                scrollEnabled={false}
                                cacheEnabled = {Platform.os === 'android'} // as image not a map for preformance
                                initialRegion={initialRegion}
                                >

                            </MapView>
                        </View>
                        <View style={{height: 100}}>
                            <View style={styles.detailWrapper}>
                                <Text style={styles.italics}>{job.company}</Text>
                                <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
                            </View>
                            <Button 
                                title="Apply Now!"
                                backgroundColor='#03a9f4'
                                onPress={() => Linking.openURL(job.url)}
                            />
                        </View>
                    </Card>
            );
        })
    }
        
    
    render(){
        return(
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    italics : {
        fontStyle: 'italic'
    }
}

const mapStateToProps = (state) => {
    return {
        likes: state.likes
    }
}


export default connect(mapStateToProps)(ReviewScreen);