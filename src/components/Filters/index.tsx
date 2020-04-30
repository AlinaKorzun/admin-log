import React, {useState} from 'react';
import '../../styles.css';
import Input from './Input';
import Picker from './Picker';
import Button from '@material-ui/core/Button';
import {getFilteredList, fillFilters, clearFilters} from '../../actions/list';
import {connect} from "react-redux";
import {Filtered} from "../../reducer/list";
import {hiddenText} from "../../interfaces";
import {isValidDate} from '../../util/util';

interface Props {
    onHandleFilter: any
    onFillFilters: any
    onClearFilters: any
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onHandleFilter: (listJson: Filtered, filterName: string) =>
            dispatch(getFilteredList(listJson, filterName)),
        onFillFilters: (filterName: string, value: string, whichFilter: string) =>
            dispatch(fillFilters(filterName, value, whichFilter)),
        onClearFilters: (filterName: string, whichFilter: string, array: []) =>
            dispatch(clearFilters(filterName, whichFilter, array)),

    }
};

const Inputs = [
    {
        type: 'input',
        value1: 'CN',
        label: 'Client Name'
    },
    {
        type: 'input',
        value1: 'CA',
        label: 'Client Account'
    },
    {
        type: 'input',
        value1: 'TN',
        label: 'Ticket Number'
    },
    {
        type: 'picker',
        value1: 'DF',
        value2: 'DT',
        label: 'Date/Time from',
        labelTo: 'to'
    },
];

const filtersInitial: Filtered = {
    CN: '',
    CA: '',
    TN: '',
    DF: '',
    DT: '',
};

const Index = (props: Props) => {
    const [filteredFieldsBetting, setFilteredFieldsBetting] = useState<Filtered>(filtersInitial);
    const [filteredFieldsFin, setFilteredFieldsFin] = useState<Filtered>(filtersInitial);
    const [hiddenTextB, setHiddenTextB] = useState<hiddenText>({
        betting: {
            DF: false,
            DT: false,

        },
        financial: {
            DF: false,
            DT: false,

        }
    });

    const onPressFilter = (filterName: string) => {
        const hiddenCheck = Object.values(hiddenTextB[filterName]);

        let tempFilters: Filtered = {...filteredFieldsBetting};
        let setFunc = setFilteredFieldsBetting;

        if (filterName === 'financial') {
            tempFilters = {...filteredFieldsFin};
            setFunc = setFilteredFieldsFin
        }

        // @ts-ignore
        const check = hiddenCheck.some((item: boolean) => {
            if (item === true) return item
        });
        if (check === true) return;

        //id date TO is empty, fill now date
        if (tempFilters.DT === '') {
            tempFilters.DT = new Date().getTime()
        }

        //for date in request in correct date format
        if (tempFilters.DT !== '' || tempFilters.DF !== '') {
            tempFilters.DT = tempFilters.DT !== '' ? new Date(tempFilters.DT).getTime() : '';
            tempFilters.DF = tempFilters.DF !== '' ? new Date(tempFilters.DF).getTime() : '';
        }

        props.onHandleFilter(tempFilters, filterName);

        setFunc(filtersInitial);
        props.onClearFilters('', filterName, filtersInitial)
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string, filterName: string) => {
        let tempFilters: Filtered = {...filteredFieldsBetting};
        let setFunc = setFilteredFieldsBetting;

        const value = e.target.value;

        if (filterName === 'financial') {
            tempFilters = {...filteredFieldsFin};
            setFunc = setFilteredFieldsFin
        }

        tempFilters[name] = value;
        setFunc(tempFilters);
        props.onFillFilters(name, value, filterName);
    };

    const clearFilter = (name: string, filterName: string, name2?: string) => {
        let tempFilters: Filtered = {...filteredFieldsBetting};
        let setFunc = setFilteredFieldsBetting;

        if (filterName === 'financial') {
            tempFilters = {...filteredFieldsFin};
            setFunc = setFilteredFieldsFin
        }

        console.log('tempFilters', tempFilters);
        console.log('name', name);

        tempFilters[name] = '';
        if (name2) tempFilters[name2] = '';

        setFunc(tempFilters);
        props.onClearFilters(name, filterName)


    };

    //validate date
    const onBlur = (name: string, filterName: string, isDatePicker?: boolean) => {
        const tempHidden: hiddenText = {...hiddenTextB};
        let isDateValid: any = true;

        let whichFilterToCheck = filteredFieldsBetting;
        if (filterName === 'financial') {
            whichFilterToCheck = filteredFieldsFin;
        }

        if (isDatePicker) {
            if (whichFilterToCheck[name] !== '') {
                isDateValid = isValidDate(whichFilterToCheck[name]);
                tempHidden[filterName][name] = !isDateValid;

                //check date From less than date TO
                if (isDateValid && whichFilterToCheck.DF !== '' && whichFilterToCheck.DT !== '') {

                    if (new Date(whichFilterToCheck.DT).getTime() - new Date(whichFilterToCheck.DF).getTime() < 0) {
                        tempHidden[filterName].DT = true;
                        tempHidden[filterName].DF = true;
                    } else {
                        tempHidden[filterName].DT = false;
                        tempHidden[filterName].DF = false;
                    }
                }
            } else {
                tempHidden[filterName][name] = false;
            }
        }

        setHiddenTextB(tempHidden);
    };

    return (
        <div className="filters-root">
            <div className='filter-each'>
                <div className="title">Betting History</div>
                <div className='input-wrapper'>

                    {Inputs.map((item: any, index: number) => {
                            if (item.type === 'input') {
                                return (<Input key={index} label={item.label} name={item.value1} onChange={onChange}
                                               filter='betting'
                                               clearFilter={clearFilter}
                                               value={filteredFieldsBetting[item.value1]}/>)
                            } else if (item.type === 'picker') {
                                return (
                                    <Picker key={index}
                                            labelFrom={item.label} labelTo={item.labelTo} nameF={item.value1}
                                            nameT={item.value2}
                                            filter='betting'
                                            onChange={onChange} clearFilter={clearFilter}
                                            blur={onBlur}
                                            hiddenText={hiddenTextB}
                                            value1={filteredFieldsBetting[item.value1]}
                                            value2={filteredFieldsBetting[item.value2]}/>
                                )
                            }
                        }
                    )}
                </div>
                <div className='filter-btn-wrapper'>
                    <Button variant="contained" color="primary" classes={{root: 'button'}} size='large'
                            onClick={() => onPressFilter('betting')}>Filter</Button>
                </div>
            </div>

            <div className='filter-each'>
                <div className="title">Financial Transactions History</div>
                <div className='input-wrapper'>
                    {Inputs.map((item: any, index: number) => {
                            if (item.type === 'input') {
                                return (<Input key={index} label={item.label} name={item.value1} onChange={onChange}
                                               clearFilter={clearFilter}
                                               filter='financial'
                                               value={filteredFieldsFin[item.value1]}/>)
                            } else if (item.type === 'picker') {
                                return (
                                    <Picker key={index} labelFrom={item.label} labelTo={item.labelTo} nameF={item.value1}
                                            nameT={item.value2}
                                            onChange={onChange} clearFilter={clearFilter}
                                            blur={onBlur}
                                            filter='financial'
                                            hiddenText={hiddenTextB}
                                            value1={filteredFieldsFin[item.value1]}
                                            value2={filteredFieldsFin[item.value2]}/>
                                )
                            }
                        }
                    )}
                </div>
                <div className='filter-btn-wrapper'>
                    <Button variant="contained" color="primary" classes={{root: 'button'}} size='large'
                            onClick={() => onPressFilter('financial')}>Filter</Button>
                </div>
            </div>
        </div>
    )
};

export default connect(null, mapDispatchToProps)(Index);