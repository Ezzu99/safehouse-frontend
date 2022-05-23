import * as React from 'react';
import { Box, Link, Typography, Drawer } from '@mui/material';
import Appbar from '../src/components/Appbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import profilePic from '../src/assets/user.png';
import { ThemeProvider } from '@mui/material';
import HeadingFont from '../src/fonts/fonts';
import { ColorButtonTextGray } from '../src/components/ColorButton';
import { purple, orange } from '@mui/material/colors';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import EditProfileForm from '../src/components/EditProfileForm';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Portfolio from '../src/components/Portfolio';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const profile = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [ngo, setNgo] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');    
    const [profileImage, setProfileImage] = React.useState('');
    const [drawer, setDrawer] = React.useState(false);
    const [value, setValue] = React.useState(0);
    // const [instance, updateInstance] = usePDF({ document: Portfolio });

    React.useEffect(() => {
        setName(localStorage.getItem('name'));
        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
        setNgo(localStorage.getItem('ngo'));
        setPhone(localStorage.getItem('phone'));
        setAddress(localStorage.getItem('address'));
        setProfileImage(localStorage.getItem('profileImage'));
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100vw', position: 'absolute', top: '0', zIndex: '20' }}>
                <Appbar component='profile'/>
            </Box>
            <Box sx={{ width: '100vw', height: '550px', paddingY: '12px' }}>
                <Box sx={{ width: '100vw', height: '150px', paddingX: '52px', boxShadow: '0px 0 24px -4px #dedede', display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ width: '250px', height: '200px', bgcolor: 'white', backgroundImage: `url(${profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover', border: '2px solid #dedede', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', top: '80px', overflow: 'hidden' }}></Box>
                    <Box sx={{ width: '100%', marginLeft: '24px', display: 'flex', flexDirection: 'column', position: 'relative', top: '85px' }}>
                        <Typography variant='body' color='#777'>@{username}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ThemeProvider theme={HeadingFont}>
                                <Typography variant='h4' color='#555'>{name}</Typography>
                            </ThemeProvider>
                            <Box suppressHydrationWarning={true} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
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
            <Box sx={{ width: '100vw', height: '100%', paddingX: '46px', boxShadow: '10px 0 24px -4px #dedede ' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    TabIndicatorProps={{
                        style: { background: purple[600], height: '3.5px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }
                    }}
                    aria-label="secondary tabs example"
                >
                    <Tab label="Certifications" {...a11yProps(0)}/>
                    <Tab label="Skills" {...a11yProps(1)}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Box sx={{ marginTop: '12px' }}>
                        <Box sx={{ width: '400px', height: '200px', borderRadius: '8px', boxShadow: '0 10px 12px  #aeaeae', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
                            <Box sx={{ width: '140px', height: '200px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant='h6' color={purple[600]} sx={{ fontWeight: 'bold' }}>SafeHouse</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, height: '200px', padding: '12px', bgcolor: purple[600], display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>Data Science</Typography>
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{ marginTop: '12px' }}>
                        <Box sx={{ width: '400px', height: '200px', borderRadius: '8px', boxShadow: '0 10px 12px  #aeaeae', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
                            <Box sx={{ width: '140px', height: '200px', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant='h6' color={purple[600]} sx={{ fontWeight: 'bold' }}>SafeHouse</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, height: '200px', padding: '12px', bgcolor: purple[600], display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>Data Science</Typography>
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
            </Box>
            <Drawer anchor='right' open={drawer} onBackdropClick={() => setDrawer(false)} sx={{ backdropFilter: 'blur(1px)', filter: 'none' }}>
                <EditProfileForm setDrawer={setDrawer} />
            </Drawer>
        </Box>
    );
}

export default profile;