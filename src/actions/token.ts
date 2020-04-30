import * as types from './actionTypes';
import {Dispatch} from 'redux';
import {Token, tokenParams} from "../interfaces";
import {http, url} from "./index";



export const loadingToken = (loading: boolean) => {
    return {
        type: types.LOADING_TOKEN,
        loading
    };
};

export const getToken = (tokeParams: tokenParams) => {
    return (dispatch: Dispatch) => {
        // dispatch(loadingToken(true)); //TODO
        dispatch(loadingToken(false));
        return http(url, 'GET',)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((token) => {
                dispatch(fetchTokenSuccess(token));
                localStorage.setItem('token', token);
                dispatch(loadingToken(false));
            })
            .catch((err) => {
                console.error(err);
            });
    };
};


export const fetchTokenSuccess = (token: string) => {
    return {
        type: types.FETCH_TOKEN_SUCCESS,
        token
    }
};