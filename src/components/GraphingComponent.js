import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material';
import HeadingFont from '../fonts/fonts';

const GraphingComponent = () => {
    const [name, setName] = React.useState();

    React.useEffect(() => {
        setName(localStorage.getItem('name'))
    }, [])

    return (
        <Box sx={{ width: '100%', height: '80vh', paddingX: '22px', overflow: 'auto', position: 'relative', zIndex: '10' }}>
            <ThemeProvider theme={HeadingFont}>
                <Typography variant="h4" sx={{ color: '#333', fontSize: 'bold' }}>Hi, Welcome back</Typography>
            </ThemeProvider>
        </Box>
    )
}

export default GraphingComponent;