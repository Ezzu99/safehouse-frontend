import * as React from 'react';
import LoginForm from '../src/components/LoginForm';
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from 'next/link';
import { green } from '@mui/material/colors';

const Index = () => {
  return (
    <Box sx={{ height: '100vh', bgcolor: 'aliceblue', display: 'flex', flexDirection: 'row', gap: '120px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      <Box sx={{ height: '400px' }}>
        <Box sx={{ width: '550px', marginTop: '18px' }}>
          <Typography variant="h2" color='primary' sx={{ fontWeight: 'bold' }}>SafeHouse</Typography>
          <Typography variant='h4' sx={{ color: 'gray' }}>At SafeHouse we not only improve society, but we help <Typography variant='body' color={green[800]} >create</Typography> one.</Typography>
          <Typography variant='h6' sx={{ marginTop: '8px', color: 'gray' }}>Interested in joining hands together?</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <Link href='/AffiliationForm/NGO'><Button size='large' variant="contained" sx={{ marginTop: '12px' }}>Affiliate with us</Button></Link>
            <Link href='/'><Button size='large' variant="outlined" sx={{ marginTop: '12px' }}>Discover More</Button></Link>
          </Box>
        </Box>
      </Box>
      <LoginForm />
    </Box>
  )
}

export default Index;