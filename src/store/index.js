import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

export default createStore(reducer, composeWithDevTools(applyMiddleware()));
