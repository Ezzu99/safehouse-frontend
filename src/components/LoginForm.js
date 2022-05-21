import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from '@mui/material/Link';
import { Typography, Checkbox, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { Box } from "@mui/system";
import { purple } from '@mui/material/colors';
import CustomTextField from './CustomTextField';
import { ColorButtonSolidOrange } from './ColorButton';

let instance = axios.create({
    baseURL: 'http://safehouse.herokuapp.com',
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [selected, setSelected] = React.useState(false);
    const [disableLogin, setDisableLogin] = React.useState(false);
    const [openErrorSnack, setOpenErrorSnack] = React.useState(false);
    const [openAlertSnack, setOpenAlertSnack] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Enter username and password!');
    const [autoHideDuration, setAutoHideDuration] = React.useState(6000);
    const [userid, setUserid] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState('');
    const [role, setRole] = React.useState('');
    let router = useRouter();

    const submitForm = async (e) => {
        e.preventDefault();

        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (username == '' | password == '') {
            setAutoHideDuration(6000);
            setAlertMessage('Enter username and password!')
            setOpenAlertSnack(true);
        }
        else if (!password.match(regex)) {
            setAutoHideDuration(10000);
            setAlertMessage('Password must contain 6 to 20 characters, at least 1 numeric digit, and at least 1 uppercase and lowercase letter!')
            setOpenAlertSnack(true);
        }
        else {
            setDisableLogin(true);
            
            try {
                // let res = await instance.post('/v1/login/', {
                //     username,
                //     password
                // })
                let res = {
                    data: {
                        token: 'abcdefghijklmnopqrstuvwxyz',
                        role: 'ngo',
                        username: 'ezaan1999',
                        id: '1',
                        name: 'Azan Ali',
                        email: 'ezaan1999.ali@gmail.com'
                    }
                }
                console.log(res);
                setLoggedIn(true);
                setToken(res.data.token);
                setRole(res.data.role);
                setUsername(res.data.username);
                setUserid(res.data.id);
                setName(res.data.name);
                setEmail(res.data.email);
                
                router.replace('/Dashboard');
            }
            catch (e) {
                setOpenErrorSnack(true);
            }
        }

        setDisableLogin(false);
    }

    React.useEffect(()  => {
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);
        localStorage.setItem('id', userid);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
    }, [loggedIn, token, role, username, userid, email])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorSnack(false);
        setOpenAlertSnack(false);
    };

    return (
        <Box sx={{ height: '400px' }}>
            <Box sx={{ width: '400px', padding: '18px', bgcolor: '#ffffff20', backdropFilter: 'blur(10px)', borderRadius: '12px', boxShadow: '0 4px 18px #ccc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <CustomTextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                <CustomTextField id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={(e) => { setPassword(e.target.value) }}/>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Checkbox checked={selected} onClick={() => { setSelected(!selected) }} sx={{ '&.Mui-checked': {color: purple[700]} }} />
                    <Typography sx={{ color: 'gray' }} onClick={() => { setSelected(!selected) }}>Remember me</Typography>
                </Box>
                <ColorButtonSolidOrange id='loginButton' size='large' variant='contained' onClick={submitForm} disabled={disableLogin}>Login</ColorButtonSolidOrange>
                <Typography align='center'><Link href='/' underline='hover' color={purple[600]}>Forgot password?</Link></Typography>
            </Box>
            <Snackbar open={openErrorSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Invalid username or password!
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertSnack} autoHideDuration={autoHideDuration} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default LoginForm;