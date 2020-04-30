import React from 'react';
import '../../styles.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import {hiddenText} from "../../interfaces";

interface Props {
    labelFrom: string
    labelTo: string
    nameF: string
    nameT: string
    onChange: any
    clearFilter: any
    blur: any
    value1: string
    value2: string
    hiddenText: hiddenText
    filter: string
}

const Picker = (props: Props) => {
    const {labelFrom, labelTo, onChange, nameF, nameT, clearFilter, value1, value2, blur, hiddenText, filter} = props;

    return (
        <div className='input-root'>
            <div className='each-picker'>
                <TextField
                    id="outlined-textarea"
                    label={labelFrom}
                    placeholder="dd/mm/yyyy hh:mm"
                    variant="outlined"
                    className='textField'
                    value={value1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, nameF, filter)}
                    onBlur={() => blur(nameF, filter, true)}
                />
                <span
                    className={classNames('hidden-text', hiddenText[filter][nameF] ? 'open' : '')}>Fill correct time</span>
            </div>

            <span>to</span>

            <div className='each-picker'>
                <TextField
                    id="outlined-textarea"
                    label={labelTo}
                    placeholder="dd/mm/yyyy hh:mm"
                    variant="outlined"
                    className='textField'
                    value={value2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, nameT, filter)}
                    onBlur={() => blur(nameT, filter, true)}
                />
                <span
                    className={classNames('hidden-text', hiddenText[filter][nameT] ? 'open' : '')}>Fill correct time</span>
            </div>
            <Button variant="contained" color="secondary" classes={{root: 'button'}}
                    onClick={() => clearFilter(nameF, filter, nameT)}>Clear</Button>
        </div>
    )
};

export default Picker;