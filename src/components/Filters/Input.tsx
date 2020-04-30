import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
    label: string
    name: string
    onChange: any
    clearFilter: any
    value: string
    filter: string
}

const Input = (props: Props) => {
    const {label, onChange, name, clearFilter, value, filter} = props;

    return (
        <div className='input-root'>
            <TextField label={label} variant="outlined" classes={{root: 'input'}}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, name, filter)} value={value}/>
            <Button variant="contained" color="secondary" classes={{root: 'button'}}
                    onClick={() => clearFilter(name, filter)}>Clear</Button>
        </div>
    )
};

export default Input;