export const isValidDate = (str: string) => {
    // dd-mm-yyyy hh:mm:ss
    const regex = /(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})\s*(\d{0,2}):?(\d{0,2}):?(\d{0,2})/,
        parts: any = regex.exec(str);
    if (parts) {
        const date: any = new Date((+parts[3]), (+parts[2]) - 1, (+parts[1]), (+parts[4]), (+parts[5]), (+parts[6]));
        if ((date.getDate() == parts[1]) && (date.getMonth() == parts[2] - 1) && (date.getFullYear() == parts[3])) {

            if (new Date().getTime() - date.getTime() > 0) {
                return date;
            }
        }
    }
    return false;
};

export const paginate = (
    totalPagesN:number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
) => {
    // calculate total pages
    let totalPages = totalPagesN;
    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
        (i) => startPage + i
    );

    // return object with all pager properties required by the view

    return {
        // totalItems: totalItems,
        currentPage: currentPage,
        // pageSize: pageSize,
        totalPages: totalPages,
        // startPage: startPage,
        // endPage: endPage,
        // startIndex: startIndex,
        // endIndex: endIndex,
        pages: pages,
    };
};