import * as React from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import { Button, Typography, TextField, Checkbox, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { Box } from "@mui/system";
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

let instance = axios.create({
    baseURL: 'http://safehouse.herokuapp.com',
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
})

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
        backgroundColor: green[800],
    },
}));

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
    const [userid, setUserid] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState('');
    const [type, setType] = React.useState('');

    const submitForm = async (e) => {
        e.preventDefault();

        setDisableLogin(true);

        if (username == '' | password == '') {
            setOpenAlertSnack(true);
        }
        else {
            try {
                let res = await instance.post('/v1/login/', {
                    username,
                    password
                })
                console.log(res);
                setLoggedIn(true);
                setToken(res.data.token);
                setType(res.data.role);
                setUsername(res.data.username);
                setUserid(res.data.id);
    
                history.push('/dashboard');
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
        localStorage.setItem('type', type);
        localStorage.setItem('username', username);
        localStorage.setItem('id', userid);
    }, [loggedIn, token, type, username, userid])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorSnack(false);
        setOpenAlertSnack(false);
    };

    return (
        <Box sx={{ height: '400px' }}>
            <Box sx={{ width: '400px', padding: '18px', bgcolor: 'white', borderRadius: '12px', boxShadow: '0 10px 28px #ddd', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                <TextField id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={(e) => { setPassword(e.target.value) }}/>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Checkbox checked={selected} onClick={() => { setSelected(!selected) }} />
                    <Typography sx={{ color: 'gray' }} onClick={() => { setSelected(!selected) }}>Remember me</Typography>
                </Box>
                <ColorButton id='loginButton' size='large' variant='contained' onClick={submitForm} disabled={disableLogin}>Login</ColorButton>
                <Typography color='primary' align='center'><Link href='/' underline='hover'>Forgotten Password?</Link></Typography>
            </Box>
            <Snackbar open={openErrorSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Invalid username or password!
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Enter username and password!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default LoginForm;