import _ from 'lodash';
import {REHYDRATE} from 'redux-persist/constants';
import {
    LIKE_JOB,
    RESET_JOBS
} from '../actions/types';


export default (state = [], action) => {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.likes || [];
        case LIKE_JOB: 
            return _.uniqBy([
                action.payload, ...state
            ], 'jobkey');
        case RESET_JOBS:
            return [];    
        default:
            return state;
    }
}