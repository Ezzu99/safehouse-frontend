import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { purple, orange } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import HeadingFont from '../src/fonts/fonts';
import GraphingComponent from '../src/components/GraphingComponent';
import DataTable from '../src/components/DataTable';
import styles from '../styles/Home.module.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Sidebar = () => {
    const [name, setName] = React.useState('');
    const [role, setRole] = React.useState('');
    const [value, setValue] = React.useState(0);
    const [openSidebar, setOpenSidebar] = React.useState(true)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        setRole(localStorage.getItem('role'));
        setName(localStorage.getItem('name'));
    }, [])
    
    return (
        <Box sx={{ bgcolor: 'white', display: 'flex', height: '100vh', width: '100%', flexDirection: 'row' }}>
            <Drawer anchor={'left'} open={openSidebar} onBackdropClick={() => setOpenSidebar(false)}>
            <Box sx={{ width: '270px', height: '100vh' }}>
                <Box sx={{ height: '75px', paddingX: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeProvider theme={HeadingFont}>
                        <Typography variant="h4" color={purple[600]} sx={{ fontWeight: 'bold' }}>SafeHouse</Typography>
                    </ThemeProvider>
                </Box>
                <Box sx={{ marginTop: '12px', marginBottom: '28px', marginX: '24px', paddingX: '22px', paddingY: '12px', bgcolor: `${orange[100]}`, borderRadius: '8px' }}>
                    <Typography variant='body1' color={orange[600]} sx={{ fontWeight: 'bold' }}>{name}</Typography>
                </Box>
                {
                    (role == 'ngo') ?
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        textColor="secondary"
                        TabIndicatorProps={{
                            style: { background: purple[600], width: '3.5px' }
                        }}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ flexGrow: 1 }}
                    >
                        <Tab label="Dashboard" sx={{ display: 'flex', alignItems: 'flex-start', paddingLeft: '46px' }} {...a11yProps(0)} />
                        <Tab label="Users" sx={{ display: 'flex', alignItems: 'flex-start', paddingLeft: '46px' }} {...a11yProps(1)} />
                    </Tabs> :
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        textColor="secondary"
                        TabIndicatorProps={{
                            style: { background: purple[600], width: '3.5px' }
                        }}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ flexGrow: 1 }}
                    >
                        <Tab label="Item one" sx={{ display: 'flex', alignItems: 'flex-start', paddingLeft: '34px' }} {...a11yProps(2)} />
                        <Tab label="Item two" sx={{ display: 'flex', alignItems: 'flex-start', paddingLeft: '34px' }} {...a11yProps(3)} />
                    </Tabs>
                }
            </Box>
            </Drawer>
            <Box sx={{ width: '100%', height: '100vh' }}>
                <Box className={[styles.bgimage, styles.bgimage2]}></Box>
                <TabPanel value={value} index={0}>
                    <GraphingComponent />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataTable />
                </TabPanel>
                <TabPanel value={value} index={2}>
                Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                Item Four
                </TabPanel>
            </Box>
        </Box>
    );
}

export default Sidebar;