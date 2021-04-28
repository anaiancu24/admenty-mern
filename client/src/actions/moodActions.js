import axios from 'axios';
import {GET_MOODS, ADD_MOOD, DELETE_MOOD, MOODS_LOADING } from './types';

export const getMoods = () => dispatch => {
    dispatch(setMoodsLoading());
    axios
        .get('/api/checkins')
        .then(res => dispatch({
            type: GET_MOODS,
            payload: res.data
        }))
}

export const addMood = (mood) => dispatch => {
    axios
        .post('/api/checkins', mood)
        .then(res => dispatch({
            type: ADD_MOOD,
            payload: res.data
        }))

}

export const deleteMood = id => dispatch => {
    axios
        .delete(`/api/checkins/${id}`)
        .then(res => dispatch({
            type: DELETE_MOOD,
            payload: id
        }))
}

export const setMoodsLoading = () => {
    return {
        type: MOODS_LOADING
    }
}