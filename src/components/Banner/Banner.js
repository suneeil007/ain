// src/components/Banner/Banner.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        height: '100vh', // Use 100vh for full screen height
        background: 'url("https://www.ain.org.np/uploads/1642747149cycl.jpg") no-repeat center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h3" color="white">
        Welcome to Our Website
      </Typography>
    </Box>
  );
};

export default Banner;
