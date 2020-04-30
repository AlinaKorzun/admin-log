import React, {useEffect} from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import Loader from './components/UI/Loader';
// @ts-ignore
import Login from './components/Login';
import {Token, tokenParams} from "./interfaces";
import {GlobalStateTree} from './reducer';
import {connect} from "react-redux";
import {fetchTokenSuccess} from "./actions/token";

type Props = {
    token?: Token
    onFillToken: any
}

const mapStateToProps = (state: GlobalStateTree) => ({
    token: state.token,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFillToken: (token: string) =>
            dispatch(fetchTokenSuccess(token)),
    }
};

const App = (props: Props) => {
    useEffect(() => {
        const isToken = localStorage.getItem('token');

        if (isToken) {
            props.onFillToken(isToken)
        }
    }, []);
    // @ts-ignore
    const {token: {token, loading}} = props;

    return (
        <div className="App">
            {loading ?
                <Loader/>
                : token ?
                    <>
                        <Filters/>
                        <Table/>
                    </>
                    : <Login/>
            }
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
