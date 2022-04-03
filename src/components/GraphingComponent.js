import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material';
import HeadingFont from '../fonts/fonts';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { purple, orange } from '@mui/material/colors';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    borderRadius: '8px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
            <Box sx={{ flexGrow: 1, marginTop: '12px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item>
                            <Box sx={{ height: '140px', bgcolor: purple[50], borderRadius: '8px' }}></Box>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Box sx={{ height: '140px', bgcolor: orange[100], borderRadius: '8px' }}></Box>
                        </Item>
                    </Grid>
                    <Grid item xs={5}>
                        <Item>
                            <Box sx={{ height: '140px', bgcolor: orange[100], borderRadius: '8px' }}></Box>
                        </Item>
                    </Grid>
                    <Grid item xs={7}>
                        <Item>
                            <Box sx={{ height: '140px', bgcolor: purple[50], borderRadius: '8px' }}></Box>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default GraphingComponent;