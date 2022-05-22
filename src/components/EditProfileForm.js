import * as React from 'react';
import axios from 'axios';
import { Box, Typography, Snackbar } from '@mui/material';
import CustomTextField from './CustomTextField';
import MuiAlert from '@mui/material/Alert';
import { purple } from '@mui/material/colors';
import { ColorButtonSolidOrange, ColorButtonOutlinedOrange, ColorButtonSolidPurple } from './ColorButton';
import styles from '../../styles/Home.module.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditProfileForm = (props) => {
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [image, setImage] = React.useState();
    const [imageName, setImageName] = React.useState('Upload Image');
    const [address, setAddress] = React.useState('');
    const [openAlertSnack, setOpenAlertSnack] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Profile updated!');
    const [severity, setSeverity] = React.useState('warning');
    const [autoHideDuration, setAutoHideDuration] = React.useState(6000);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlertSnack(false);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!email || !phone || !address || !image) {
            setSeverity('warning');
            setAlertMessage('Please fill all fields!');
            setOpenAlertSnack(true);
        }
        else {
            setSeverity('success');
            setAlertMessage('Profile updated!');
            setOpenAlertSnack(true);
        }
        
    }

    return (
        <Box sx={{ paddingX: '46px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box className={[styles.bgimage, styles.bgimage3]}></Box>
            <Box sx={{ height: '90px', display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                <Typography variant='h5' fontWeight='bold' color={purple[600]}>Edit Profile</Typography>
            </Box>
            <Box sx={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    <CustomTextField sx={{ flexGrow: 1 }} label='Email' color="secondary" onChange={(e) => setEmail(e.target.value)} />
                    <CustomTextField sx={{ flexGrow: 1 }} label='Phone' type='number' color="secondary" onChange={(e) => setPhone(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <CustomTextField fullWidth label='Address' color="secondary" onChange={(e) => setAddress(e.target.value)} />
                    <ColorButtonSolidPurple component="label" size='large'>
                        {imageName}
                        <input
                            type="file"
                            hidden
                            onChange={(e) => {
                                setImageName(e.target.files[0].name);
                                setImage(e.target.files[0]);
                            }}
                        />
                    </ColorButtonSolidPurple>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <ColorButtonSolidOrange size='large' fullWidth onClick={submitForm}>Update</ColorButtonSolidOrange>
                <ColorButtonOutlinedOrange size='medium' fullWidth onClick={() => props.setDrawer(false)}>Cancel</ColorButtonOutlinedOrange>
            </Box>
            <Snackbar open={openAlertSnack} autoHideDuration={autoHideDuration} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default EditProfileForm;