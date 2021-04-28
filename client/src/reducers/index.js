import { combineReducers } from 'redux';
import moodReducer from './moodReducer';

export default combineReducers({
    mood: moodReducer
})