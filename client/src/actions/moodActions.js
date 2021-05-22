import axios from 'axios';
import {GET_MOODS, ADD_MOOD, DELETE_MOOD, MOODS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getMoods = () => (dispatch, getState) => {
    dispatch(setMoodsLoading());
    axios
        .get('/api/checkins', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_MOODS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addMood = (mood) => (dispatch, getState) => {
    axios
        .post('/api/checkins', mood, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_MOOD,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}

export const deleteMood = id => (dispatch, getState) => {
    axios
        .delete(`/api/checkins/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_MOOD,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}

export const setMoodsLoading = () => {
    return {
        type: MOODS_LOADING
    }
}