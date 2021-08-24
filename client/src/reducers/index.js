import { combineReducers } from 'redux';
import moodReducer from './moodReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer'

export default combineReducers({
    mood: moodReducer,
    error: errorReducer,
    auth: authReducer
})