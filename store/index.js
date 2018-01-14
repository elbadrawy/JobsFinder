import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import reducers from '../reducers';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )
)

persistStore(store, {storage: AsyncStorage, whitelist: ['likes'] });
export default store;

