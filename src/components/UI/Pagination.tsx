import React, { useEffect, useState } from 'react';
// import withStyles from '@material-ui/core/styles/withStyles';
// import { Theme, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import Prev from '../UI/icons/Prev';
import Next from '../UI/icons/Next';
import { paginate } from '../../util/util';

interface Props {
    // listToDisplay: any;
    page: number;
    itemsPerPage: number;
    maxPages: number;
    pageClick: any;
    totalPages: number
}



const Pagination = (props: Props) => {
    const [paginationObj, setPaginationObj] = useState({
        currentPage: 0,
        totalPages: 0,
        pages: [0],
    });

    const {
        page,
        itemsPerPage,
        pageClick,
        maxPages,
        totalPages
    } = props;

    useEffect(() => {
        let paginationObj = paginate(
            totalPages,
            page,
            itemsPerPage,
            maxPages
        );
        setPaginationObj(paginationObj);
    }, [page]);

    const pageClickFucn = (i: number) => {
        if (i > 0 && i <= paginationObj.totalPages) {
            pageClick(i);
        }
    };

    return paginationObj.pages.length > 1 ? (
        <div className='pagination-wrapper'>
            <span
                className={classNames(
                    page === 1 ? 'grey' : 'white',
                    'arrowPrev'
                )}
                onClick={() => pageClickFucn(paginationObj.currentPage - 1)}
            >
                <Prev size={15} />
            </span>
            <span
                className={classNames(
                    page === 1 ? 'grey' : 'white',
                    'bold'
                )}
                onClick={() => pageClickFucn(1)}
            >
                First
            </span>

            {paginationObj.pages.map((i: number) => (
                <span
                    key={i}
                    className={
                        paginationObj.currentPage === i ? 'current' : ''
                    }
                    onClick={() => pageClickFucn(i)}
                >
                    {i}
                </span>
            ))}

            <span
                className={classNames(
                    page === paginationObj.totalPages
                        ? 'grey' : 'white',
                    'arrowPrev'
                )}
                onClick={() => pageClickFucn(paginationObj.currentPage + 1)}
            >
                <Next size={15} />
            </span>
        </div>
    ) : null;
};

export default Pagination;
