import axios from 'axios';
import {
    FETCH_JOB,
    LIKE_JOB,
    RESET_JOBS
} from './types';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';


const JOB_QUERY_PARAMS = {
    publisher:'4201738803816157',
    format: 'json',
    v: '2',
    latlong: '1',
    redius: 10,
    q:'javascript',

}

const API_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const buildJobUrl = (zip) => {
    const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip.zipcode});
    return `${API_ROOT_URL}${query}`
}    

export const fetchJobs = (region, navigate) => async (dispatch) => {
    try{
        let zip = await reverseGeocode(region);
        const url = buildJobUrl(zip);
        let {data} = await axios.get(url);
        dispatch({type:FETCH_JOB, payload: data});
        navigate('deck');
    }catch(e){
        console.log(e);
    }
        
} 


export const LikeJob = (job) => {
    return {
        type:LIKE_JOB,
        payload:job
    }
}


export const ResetJob = () => {
    return {
        type:RESET_JOBS
    }
}

