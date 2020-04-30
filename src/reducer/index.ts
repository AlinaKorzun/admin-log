import { combineReducers } from 'redux'
import list, {AllList} from './list'
import token from './token';
import {Token} from "../interfaces";

export interface GlobalStateTree {
    list: AllList;
    token: Token;
}

const rootReducer = combineReducers({
    list,
    token
});

export default rootReducer