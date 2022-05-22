import * as React from 'react';
import LoginForm from '../src/components/LoginForm';
import { ThemeProvider, Typography } from "@mui/material";
import HeadingFont from '../src/fonts/fonts';
import { Box } from "@mui/system";
import Link from 'next/link';
import { purple, orange } from '@mui/material/colors';
import styles from '../styles/Home.module.css';
import { ColorButtonOutlinedPurple, ColorButtonSolidPurple } from '../src/components/ColorButton';

const Index = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%', bgcolor: 'white', display: 'flex', flexDirection: 'row', gap: '120px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', position: 'absolute', top: '0', left: '0', zIndex: '10' }}>
      <Box className={[styles.bgimage, styles.bgimage1]}></Box>
      <Box sx={{ height: '400px' }}>
        <Box sx={{ width: '550px', marginTop: '18px' }}>
          <ThemeProvider theme={HeadingFont}>
            <Typography variant="h2" color={purple[600]} sx={{ fontWeight: 'bold' }}>SafeHouse</Typography>
          </ThemeProvider>
          <Typography variant='h4' sx={{ color: '#333' }}>At SafeHouse we not only improve society, but we help <Typography variant='body' color={orange[900]} >create</Typography> one.</Typography>
          <Typography variant='h6' sx={{ marginTop: '8px', color: '#333' }}>Interested in joining hands together?</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <Link href='/AffiliationForm/NGO'><ColorButtonSolidPurple size='large' variant="contained" sx={{ marginTop: '12px' }}>Affiliate with us</ColorButtonSolidPurple></Link>
            <Link href='/'><ColorButtonOutlinedPurple size='large' variant="outlined" sx={{ marginTop: '12px' }}>Discover More</ColorButtonOutlinedPurple></Link>
          </Box>
        </Box>
      </Box>
      <LoginForm />
    </Box>
  )
}

export default Index;