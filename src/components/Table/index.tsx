import React from 'react';
import {GlobalStateTree} from "../../reducer";
import {connect} from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from './Table';
import Loader from '../UI/Loader';

const tableHeadings = {
    betting: ['Sequence Number', 'Licensee', 'Client Name', 'Account', 'Client Location',
        'Client IP Address', 'Betting Channel', 'Betting Channel Name', 'Ticket Number', 'Bet Description',
        'Bet Amount', 'Odds', 'Bet Status', 'Bet Status Date/Time', 'Time Zone'],
    financial: ['Sequence Number', 'Licensee', 'Client Name', 'Account', 'Client Location', 'Client IP Address',
        'Transaction Type', 'Transaction Amount', 'Transaction Comment', 'Date/Time', 'Time Zone', 'Account Balance',
        'Transaction Status', 'Transaction Status Date/Time']
};

interface Props {
    loading?: boolean
}

const mapStateToProps = (state: GlobalStateTree) => ({
    loading: state.list.loading
});

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Index = (props: Props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    return (
        <>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Betting" {...a11yProps(0)} />
                <Tab label="Financial" {...a11yProps(1)} />
            </Tabs>

            {value === 0 &&
            // @ts-ignore
            <Table headings={tableHeadings.betting} tableName='betting'/>}
            {value === 1 &&
            // @ts-ignore
            <Table headings={tableHeadings.financial} tableName='financial'/>}
        </>
    )
};

export default connect(mapStateToProps, null)(Index);