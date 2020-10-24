import pagenumberReducer from './pagenumber';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    pageNumber : pagenumberReducer
})

export default reducers;