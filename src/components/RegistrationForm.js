import * as React from 'react';
import { Box, FormControl, MenuItem, InputLabel, Select, TextField, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { purple } from '@mui/material/colors';
import { ColorButtonSolidOrange } from './ColorButton';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegistrationForm = (props) => {
    const [fname, setFname] = React.useState('');
    const [lname, setLname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cPassword, setCPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [dob, setdob] = React.useState();
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [openAlertSnack, setOpenAlertSnack] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Passwords do not match!');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlertSnack(false);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (!password.match(regex)) {
            setAlertMessage('Password must contain 6 to 20 characters, at least 1 numeric digit, and at least 1 uppercase and lowercase letter!')
            setOpenAlertSnack(true);
        }
        else if (password != cPassword) {
            setAlertMessage('Passwords do not match!')
            setOpenAlertSnack(true);
        }
    }

    return (
        <Box sx={{ paddingX: '46px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ height: '90px', display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                <Typography variant='h5' fontWeight='bold' color={purple[600]}>Register {props.role}</Typography>
            </Box>
            <Box sx={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    <TextField sx={{ flexGrow: 1 }} label='First name' color="secondary" onChange={(e) => setFname(e.target.value)} />
                    <TextField sx={{ flexGrow: 1 }} label='Last name' color="secondary" onChange={(e) => setLname(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <TextField fullWidth label='Username' color="secondary" onChange={(e) => setUsername(e.target.value)} />
                    <TextField fullWidth label='Password' type='password' color="secondary" onChange={(e) => setPassword(e.target.value)} />
                    <TextField fullWidth label='Confirm password' type='password' color="secondary" onChange={(e) => setCPassword(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    <TextField sx={{ flexGrow: 1 }} label='Email' type='email' color="secondary" onChange={(e) => setEmail(e.target.value)} />
                    <TextField disabled label='Role' value={props.role} color="secondary" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    <TextField label='Phone number' type='number' color="secondary" onChange={(e) => setPhone(e.target.value)} />
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker label="Date of Birth" inputFormat="dd/MM/yyyy" openTo='year' value={dob} onChange={(value) => setdob(value)} renderInput={(params) => <TextField color="secondary" {...params} />} />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-standard-label" color="secondary">Gender</InputLabel>
                        <Select labelId="demo-simple-select-standard-label" sx={{ width: '130px' }} label="Gender" color="secondary" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                            <MenuItem value='other'>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ flexGrow: 1 }} label='Address' color="secondary" onChange={(e) => setAddress(e.target.value)} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <ColorButtonSolidOrange onClick={submitForm}>Register</ColorButtonSolidOrange>
            </Box>
            <Snackbar open={openAlertSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default RegistrationForm;