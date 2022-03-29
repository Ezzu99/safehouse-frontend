import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { purple } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import HeadingFont from '../src/fonts/fonts';

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

export default function Sidebar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ bgcolor: 'white', display: 'flex', height: '100vh', width: '100%', flexDirection: 'row' }}
        >
            <Box sx={{ width: '250px', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
                <Box sx={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeProvider theme={HeadingFont}>
                        <Typography variant="h4" color={purple[600]} sx={{ fontWeight: 'bold' }}>SafeHouse</Typography>
                    </ThemeProvider>
                </Box>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ flexGrow: 1 }}
                >
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <Box sx={{ flexGrow: 1, height: '100vh' }}>
                <TabPanel value={value} index={0}>
                Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                Item Two
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