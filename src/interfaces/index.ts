export interface hiddenText {
    betting: {
        DF: boolean,
        DT: boolean,
        [key: string]: any;
    },
    financial: {
        DF: boolean,
        DT: boolean,
        [key: string]: any;
    }

    [key: string]: any;
}

export interface bettingTable {
    seqNum: number
    licence: string
    clName: string
    account: string
    clLocation: string
    clIPAddress: string
    betChannel: string
    betChanName: string
    ticketNum: string
    betDesc: string
    betAmount: string
    odds: string
    betStatus: string
    betStatDateTime: string
    timeZone: string

    [key: string]: any;
}

export interface financialTable {
    seqNum: number
    licence: string
    clName: string
    account: string
    clLocation: string
    clIPAddress: string
    transType: string
    transAmount: string
    transComment: string
    dateTime: string
    timeZone: string
    accBalance: string
    transStatus: string
    transStatDateTime: string

    [key: string]: any;
}

export interface tokenParams {
    login: string
    password: string

    [key: string]: any;
}

export interface Token {
    token: string
    loading: boolean

    [key: string]: any;
}

export interface Request {
    recordType: 'BET' | 'FIN' | undefined
    clientName: string | undefined
    clientAccount: string | undefined
    ticketNumber: string | undefined
    from: number | undefined
    until: number
    min: number
    max: number

    [key: string]: any;
}