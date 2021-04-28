/* eslint-disable import/no-anonymous-default-export */
import {GET_MOODS, ADD_MOOD, DELETE_MOOD, MOODS_LOADING } from '../actions/types';

const initialState = {
    moods: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MOODS:
            return {
                ...state,
                moods: action.payload,
                loading: false
            }
            case ADD_MOOD:
                return {
                    ...state,
                    moods: [action.payload, ...state.moods]
                }
        case DELETE_MOOD:
            return {
                ...state,
                moods: state.moods.filter(mood => mood._id !== action.payload)
            }
        case MOODS_LOADING:
            return {
                ...state,
                loading:true
            }
        default:
            return state;
    }
}