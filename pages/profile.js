import * as React from 'react';
import { Box, Link, Typography, Drawer } from '@mui/material';
import Appbar from '../src/components/Appbar';
import profilePic from '../src/assets/user.png';
import { ThemeProvider } from '@mui/material';
import HeadingFont from '../src/fonts/fonts';
import { ColorButtonTextGray } from '../src/components/ColorButton';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import EditProfileForm from '../src/components/EditProfileForm';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Portfolio from '../src/components/Portfolio';

const profile = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [ngo, setNgo] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');    
    const [profileImage, setProfileImage] = React.useState('');
    const [drawer, setDrawer] = React.useState(false);
    // const [instance, updateInstance] = usePDF({ document: Portfolio });

    React.useEffect(() => {
        setName(localStorage.getItem('name'));
        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
        setNgo(localStorage.getItem('ngo'));
        setPhone(localStorage.getItem('phone'));
        setAddress(localStorage.getItem('address'));
        setProfileImage(localStorage.getItem('profileImage'));
    }, [])

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100vw', position: 'absolute', top: '0', zIndex: '20' }}>
                <Appbar component='profile'/>
            </Box>
            <Box sx={{ width: '100vw', height: '550px', paddingY: '12px' }}>
                <Box sx={{ width: '100vw', height: '150px', paddingX: '52px', boxShadow: '0px 0 24px -4px #dedede', display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ width: '300px', height: '200px', bgcolor: 'white', backgroundImage: `url(${profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover', border: '2px solid #dedede', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', top: '80px', overflow: 'hidden' }}></Box>
                    <Box sx={{ width: '100%', marginLeft: '24px', display: 'flex', flexDirection: 'column', position: 'relative', top: '85px' }}>
                        <Typography variant='body' color='#777'>{username}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ThemeProvider theme={HeadingFont}>
                                <Typography variant='h4' color='#555'>{name}</Typography>
                            </ThemeProvider>
                            <Box suppressHydrationWarning={true} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                { process.browser && <PDFDownloadLink document={<Portfolio name={name} email={email} phoneNum={phone} courses={[]} jobs={[]} />} fileName={`${name.replace(/\s/g, '-')}.pdf`}>
                                    {({ loading }) => loading ? <ColorButtonTextGray startIcon={<PostAddIcon />} sx={{ position: 'relative', top: '-8px' }}>Loading...</ColorButtonTextGray> : <ColorButtonTextGray startIcon={<PostAddIcon />} sx={{ position: 'relative', top: '-8px' }}>Download Portfolio</ColorButtonTextGray>}
                                    </PDFDownloadLink>
                                }
                                <ColorButtonTextGray startIcon={<EditIcon />} sx={{ position: 'relative', top: '-8px' }} onClick={() => setDrawer(true)}>Edit Profile</ColorButtonTextGray>
                            </Box>
                        </Box>
                        <Typography variant='body' color='#777' sx={{ marginTop: '22px' }}>{ngo}</Typography>
                        <Typography variant='body' color='#777' sx={{ marginTop: '8px' }}><Link href={'mailto:' + email}>{email}</Link></Typography>
                        <Typography variant='body' color='#777' sx={{ marginTop: '8px' }}>{address}</Typography>
                        <Typography variant='body' color='#777' sx={{ marginTop: '8px' }}>{phone}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100vw', height: '100%', boxShadow: '10px 0 24px -4px #dedede ' }}>
                
            </Box>
            <Drawer anchor='right' open={drawer} onBackdropClick={() => setDrawer(false)} sx={{ backdropFilter: 'blur(1px)', filter: 'none' }}>
                <EditProfileForm setDrawer={setDrawer} />
            </Drawer>
        </Box>
    );
}

export default profile;