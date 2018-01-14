import {FETCH_JOB} from '../actions/types';


const INIT_STAT = {
    results: []
};

export default JobReducer = (state = INIT_STAT, action) => {
    switch (action.type) {
        case FETCH_JOB:
            return action.payload;
        default:
            return state;
    }
}