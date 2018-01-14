import {combineReducers} from 'redux';
import auth from './AuthReducer';
import jobs from './JobReducer';
import likes from './LikesReducer';
export default combineReducers({
    auth,
    jobs,
    likes
});