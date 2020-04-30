import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {getToken} from "../../actions/token";
import {tokenParams} from "../../interfaces";
import {connect} from "react-redux";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

interface State {
    login: string;
    password: string;
    showPassword: boolean;
}

interface Props {
    onGetToken: any
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetToken: (tokeParams: tokenParams) =>
            dispatch(getToken(tokeParams)),
    }
};

const Index = (props: Props) => {
    const [values, setValues] = React.useState<State>({
        login: '',
        password: '',
        showPassword: false,
    });

    const [open, setOpen] = React.useState(false);

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const sendLoginData = () => {
        if (values.login !== '' && values.password !== '') {
            setOpen(false);
            props.onGetToken(values.login, values.password)
        } else {
            setOpen(true);
        }
    };


    return (
        <div className='login-wrapper'>
            <TextField label='Login' variant="outlined" classes={{root: 'login-input'}}
                       onChange={handleChange('login')} value={values.login}/>

            <FormControl classes={{root: 'login-input'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>

            <Button variant="contained" color="primary" classes={{root: 'button'}}
                    onClick={sendLoginData}>LOG IN</Button>

            <Collapse in={open}>
                <Alert severity="warning"
                       classes={{root: 'collapse'}}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setOpen(false);
                               }}
                           >
                               <CloseIcon fontSize="inherit" />
                           </IconButton>
                       }
                >
                    Please fill all fields
                </Alert>
            </Collapse>
        </div>
    )
};

export default connect(null, mapDispatchToProps)(Index);