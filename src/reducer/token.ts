import {
    FETCH_TOKEN_SUCCESS,
    LOADING_TOKEN
} from '../actions/actionTypes';
import {Token} from "../interfaces";

const initialState: Token = {
    token: 'token',
    loading: false
};

export default function token(state = initialState, action: any) {
    switch (action.type) {
        case FETCH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.token
            };
        case LOADING_TOKEN:
            return{
                ...state,
                loading: action.loading
            };
        default:
            return state
    }
}



