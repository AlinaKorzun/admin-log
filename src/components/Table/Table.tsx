import React, {useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
// import {Token} from "../../interfaces";
import {GlobalStateTree} from "../../reducer";
import {connect} from "react-redux";
import Loader from '../UI/Loader';
import {bettingTable, financialTable} from "../../interfaces";

import Pagination from '../UI/Pagination';

interface Props {
    loading?: boolean
    headings: string[]
    list: {
        betting: bettingTable[],
        financial: financialTable[]
    },
    tableName: string
}

const mapStateToProps = (state: GlobalStateTree) => ({
    loading: state.list.loading,
    list: state.list.list
});


const TableEach = (props: Props) => {
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 5;

    const {headings, list, tableName} = props;
    let whichTableListToUse: any = [];

    if (tableName === 'financial') {
        whichTableListToUse = list.financial
    } else if (tableName === 'betting') {
        whichTableListToUse = list.betting
    }


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, whichTableListToUse.length - page * rowsPerPage);

    const pageClick = (i: number) => {
        setPage(i);
    };


    return (
        <>
        <TableContainer component={Paper} classes={{root: 'table-wrapper'}}>
            {/*<div className='title'>Table</div>*/}

            {props.loading ?
                <div className='table-loader'>
                    <Loader/>
                </div>
                : <Table className='table' aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            {headings.map((item: string, index: number) => (
                                <TableCell align="center" key={index}>{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {whichTableListToUse.map((row: any, index: number) =>
                            tableName === 'betting' ? (
                                    <TableRow key={index}>
                                        <TableCell align="left">{row.seqNum}</TableCell>
                                        <TableCell align="left">{row.licence}</TableCell>
                                        <TableCell align="left">{row.clName}</TableCell>
                                        <TableCell align="left">{row.account}</TableCell>
                                        <TableCell align="left">{row.clLocation}</TableCell>
                                        <TableCell align="left">{row.clIPAddress}</TableCell>
                                        <TableCell align="left">{row.betChannel}</TableCell>
                                        <TableCell align="left">{row.betChanName}</TableCell>
                                        <TableCell align="left">{row.ticketNum}</TableCell>
                                        <TableCell align="left">{row.betDesc}</TableCell>
                                        <TableCell align="left">{row.betAmount}</TableCell>
                                        <TableCell align="left">{row.odds}</TableCell>
                                        <TableCell align="left">{row.betStatus}</TableCell>
                                        <TableCell align="left">{row.betStatDateTime}</TableCell>
                                        <TableCell align="left">{row.timeZone}</TableCell>
                                    </TableRow>)
                                : <TableRow key={index}>
                                    <TableCell align="left">{row.seqNum}</TableCell>
                                    <TableCell align="left">{row.licence}</TableCell>
                                    <TableCell align="left">{row.clName}</TableCell>
                                    <TableCell align="left">{row.account}</TableCell>
                                    <TableCell align="left">{row.clLocation}</TableCell>
                                    <TableCell align="left">{row.clIPAddress}</TableCell>
                                    <TableCell align="left">{row.transType}</TableCell>
                                    <TableCell align="left">{row.transAmount}</TableCell>
                                    <TableCell align="left">{row.transComment}</TableCell>
                                    <TableCell align="left">{row.dateTime}</TableCell>
                                    <TableCell align="left">{row.timeZone}</TableCell>
                                    <TableCell align="left">{row.accBalance}</TableCell>
                                    <TableCell align="left">{row.transStatus}</TableCell>
                                    <TableCell align="left">{row.transStatDateTime}</TableCell>
                                </TableRow>
                        )}
                    </TableBody>

                </Table>
            }
            <Pagination
                pageClick={pageClick}
                page={page}
                maxPages={10}
                itemsPerPage={1}
                totalPages={10}/>
        </TableContainer>

    </>

    )
};

export default connect(mapStateToProps, null)(TableEach);