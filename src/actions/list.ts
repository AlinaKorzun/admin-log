import * as types from "./actionTypes";
import {Dispatch} from "redux";
import {Filtered, List} from "../reducer/list";
import {Token} from "../interfaces";
import {http, url} from "./index";
import {bettingTable, financialTable} from '../interfaces'

const bettingTableRows: bettingTable[] = [
    {
        seqNum: 123,
        licence: 'licence',
        clName: 'Client Name',
        account: 'Account',
        clLocation: 'Client Location',
        clIPAddress: 'IP Address',
        betChannel: 'Betting Channel',
        betChanName: 'Betting Channel Name',
        ticketNum: '123-432-defr',
        betDesc: 'Description',
        betAmount: '100 AUD',
        odds: 'some odds',
        betStatus: 'status',
        betStatDateTime: '12/34/5643 33:22',
        timeZone: 'UTC'
    }, {
        seqNum: 1234,
        licence: 'licence',
        clName: 'Client Name',
        account: 'Account',
        clLocation: 'Client Location',
        clIPAddress: 'IP Address',
        betChannel: 'Betting Channel',
        betChanName: 'Betting Channel Name',
        ticketNum: '123-432-defr',
        betDesc: 'Description',
        betAmount: '100 AUD',
        odds: 'some odds',
        betStatus: 'status',
        betStatDateTime: '12/34/5643 33:22',
        timeZone: 'UTC'
    }, {
        seqNum: 1223,
        licence: 'licence',
        clName: 'Client Name',
        account: 'Account',
        clLocation: 'Client Location',
        clIPAddress: 'IP Address',
        betChannel: 'Betting Channel',
        betChanName: 'Betting Channel Name',
        ticketNum: '123-432-defr',
        betDesc: 'Description',
        betAmount: '100 AUD',
        odds: 'some odds',
        betStatus: 'status',
        betStatDateTime: '12/34/5643 33:22',
        timeZone: 'UTC'
    }];

const financialTableRows: financialTable[] = [
    {
        seqNum: 3333,
        licence: 'licence',
        clName: 'Client Name',
        account: 'Account',
        clLocation: 'Client Location',
        clIPAddress: 'IP Address',
        transType: 'some type',
        transAmount: '1000 AUD',
        transComment: 'blah blah',
        dateTime: '33/44/2222 44:33',
        timeZone: 'UTC',
        accBalance: '444 AUD',
        transStatus: 'status',
        transStatDateTime: '22/33/4444 66:33'
    }, {
        seqNum: 33323,
        licence: 'licence',
        clName: 'Client Name',
        account: 'Account',
        clLocation: 'Client Location',
        clIPAddress: 'IP Address',
        transType: 'some type',
        transAmount: '1000 AUD',
        transComment: 'blah blah',
        dateTime: '33/44/2222 44:33',
        timeZone: 'UTC',
        accBalance: '444 AUD',
        transStatus: 'status',
        transStatDateTime: '22/33/4444 66:33'
    },];

export const loading = (loading: boolean) => {
    return {
        type: types.LOADING,
        loading
    };
};

export const initFetch = () => {
    return (dispatch: Dispatch) => {
        dispatch(loading(true));
        return http(url, 'GET',)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((list) => {
                dispatch(listFetchDataSuccess(list, ''));
                dispatch(loading(false));
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

export const getFilteredList = (listJson: Filtered, filterName: string) => {
    return (dispatch: Dispatch) => {
        let exactFilter: bettingTable[] | financialTable[] = bettingTableRows;

        if (filterName === 'financial') exactFilter = financialTableRows;

//TODO TEMP
        dispatch(loading(true));
        dispatch(listFetchDataSuccess(exactFilter, filterName));
        setTimeout(() => {
            dispatch(loading(false));
        }, 1000)


        // return http(url, 'GET', listJson)
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw Error(response.statusText);
        //         }
        //         return response;
        //     })
        //     .then((response) => response.json())
        //     .then((list) => {
        //         dispatch(listFetchDataSuccess(list));
        //         dispatch(loading(false));
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
    }
};

export const fillFilters = (filterName: string, value: string, whichFilter: string) => {
    return {
        type: types.FILL_FILTERS,
        filterName,
        value,
        whichFilter
    }
};

export const clearFilters = (filterName: string, whichFilter: string, array?: []) => {
    return {
        type: types.CLEAR_FILTERS,
        filterName,
        whichFilter,
        array
    }
};


const listFetchDataSuccess = (list: bettingTable[] | financialTable[], filterName: string) => {
    return {
        type: types.LIST_FETCH_DATA_SUCCESS,
        list,
        filterName
    };
};