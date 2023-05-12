import { Helmet } from 'react-helmet-async';

import { useEffect } from 'react';
// @mui

import {  Container, Typography } from '@mui/material';
// components

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  useEffect(()=>{
    
  })

  return (
    <>
      <Helmet>
        <title> Dashboard  </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        
      </Container>
    </>
  );
}
