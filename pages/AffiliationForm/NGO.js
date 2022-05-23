import { Box, Typography } from '@mui/material';
import { ThemeProvider, Snackbar } from '@mui/material';
import { purple } from '@mui/material/colors';
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ColorButtonOutlinedOrange, ColorButtonSolidOrange, ColorButtonSolidPurple } from '../../src/components/ColorButton';
import MuiAlert from '@mui/material/Alert';
import CustomTextField from '../../src/components/CustomTextField';
import HeadingFont from '../../src/fonts/fonts';

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

const NGO = () => {
	const [username, setUsername] = React.useState();
	const [name, setName] = React.useState();
	const [email, setEmail] = React.useState();
	const [website, setWebsite] = React.useState();
	const [phone, setPhone] = React.useState();
	const [address, setAddress] = React.useState();
	const [description, setDescription] = React.useState();
	const [image, setImage] = React.useState();
    const [imageName, setImageName] = React.useState('Upload Image');
    const [openAlertSnack, setOpenAlertSnack] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('Enter username and password!');
    const [severity, setSeverity] = React.useState('warning');

	let router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!username || !name || !email || !website || !phone || !address || !description) {
			setSeverity('warning');
			setAlertMessage('Please fill all fields!');
			setOpenAlertSnack(true);
		}
		else {
			try {
				// let res = await instance.post('/v1/login/', {
				//     username,
				// 	name,
				// 	email,
				// 	website,
				// 	phone,
				// 	address,
				// 	description
				// })
	
				setSeverity('success');
				setAlertMessage('Application Sent!');
				setOpenAlertSnack(true);
			}
			catch {
				setSeverity('error');
				setAlertMessage('Error Sending Application!');
				setOpenAlertSnack(true);
			}
		}
	}

	const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlertSnack(false);
    };

	return (
		<Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Box sx={{ width: '600px', height: '80vh', display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<ThemeProvider theme={HeadingFont}>
					<Typography color={purple[600]} sx={{ fontSize: '46px', textAlign: 'center' }}>SafeHouse</Typography>
				</ThemeProvider>
				<Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
					<CustomTextField fullWidth label='Username' color="secondary" onChange={(e) => setUsername(e.target.value)} />
					<CustomTextField fullWidth label='Name' color="secondary" onChange={(e) => setName(e.target.value)} />				
				</Box>
				<Box>
					<CustomTextField fullWidth label='Email' color="secondary" onChange={(e) => setEmail(e.target.value)} />
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
					<CustomTextField fullWidth label='Website' color="secondary" onChange={(e) => setWebsite(e.target.value)} />
					<CustomTextField fullWidth label='Phone' type='number' color="secondary" onChange={(e) => setPhone(e.target.value)} />
				</Box>
				<Box>
					<CustomTextField fullWidth label='Address' color="secondary" onChange={(e) => setAddress(e.target.value)} />
				</Box>
				<Box>
					<CustomTextField multiline rows={4} maxRows={4} fullWidth label='Description' color="secondary" onChange={(e) => setDescription(e.target.value)} />
				</Box>
				<Box>
					<ColorButtonSolidPurple fullWidth component="label" size='large'>
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
				<Box>
					<ColorButtonSolidOrange fullWidth size='large' onClick={handleSubmit}>Submit Application</ColorButtonSolidOrange>
				</Box>
				<Box>
					<ColorButtonOutlinedOrange fullWidth onClick={() => router.push('/')}>Cancle</ColorButtonOutlinedOrange>
				</Box>
			</Box>
			<Snackbar open={openAlertSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {alertMessage}
                </Alert>
            </Snackbar>
		</Box>
	)
}

export default NGO;