import {
    LOADING,
    LIST_FETCH_DATA_SUCCESS,
    FILL_FILTERS,
    CLEAR_FILTERS
} from '../actions/actionTypes'
import {bettingTable, financialTable} from "../interfaces";

export interface List {
    betting: bettingTable[]
    financial: financialTable[]

    [key: string]: any;
}

export interface Filtered {
    CN: string
    CA: string
    TN: string
    DF: string | number
    DT: string | number

    [key: string]: any;
}

export interface AllList {
    list: {
        betting: bettingTable[],
        financial: financialTable[]
    },
    loading: boolean
    page: number
    filteredFields: {
        betting: Filtered,
        financial: Filtered

        [key: string]: any;
    }

    [key: string]: any;
}

const initialState: AllList = {
    list: {
        betting: [{
            seqNum: 0,
            licence: '',
            clName: '',
            account: '',
            clLocation: '',
            clIPAddress: '',
            betChannel: '',
            betChanName: '',
            ticketNum: '',
            betDesc: '',
            betAmount: '',
            odds: '',
            betStatus: '',
            betStatDateTime: '',
            timeZone: '',
        }],
        financial: [{
            seqNum: 0,
            licence: '',
            clName: '',
            account: '',
            clLocation: '',
            clIPAddress: '',
            transType: '',
            transAmount: '',
            transComment: '',
            dateTime: '',
            timeZone: '',
            accBalance: '',
            transStatus: '',
            transStatDateTime: '',
        }]
    },
    loading: false,
    page: 1,
    filteredFields: {
        betting: {
            CN: '',
            CA: '',
            TN: '',
            DF: '',
            DT: '',
        },
        financial: {
            CN: '',
            CA: '',
            TN: '',
            DF: '',
            DT: '',
        }
    }
};

export default function list(state = initialState, action: any) {
    switch (action.type) {
        case LIST_FETCH_DATA_SUCCESS:
            let filterList = {...state};

            // @ts-ignore
            filterList.list[action.filterName] = action.list;

            return {...state, filterList};

        case LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case FILL_FILTERS: {
            const {filterName, value, whichFilter} = action;
            let filterState = {...state};

            filterState.filteredFields[whichFilter][filterName] = value;

            return {...state, ...filterState};
        }

        case CLEAR_FILTERS: {
            const {filterName, whichFilter, array} = action;
            let clearFilterState = {...state};

            clearFilterState.filteredFields[whichFilter][filterName] = '';

            if (filterName === 'DF') {
                clearFilterState.filteredFields[whichFilter].DT = ''
            }

            if (array) {
                const obj = {...array};
                clearFilterState.filteredFields[whichFilter] = obj
            }

            return {...state, ...clearFilterState};
        }


        default:
            return state
    }
}
