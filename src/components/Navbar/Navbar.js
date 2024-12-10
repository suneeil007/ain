// src/components/Navbar/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, MenuItem, ListItemText } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for the container

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#ffca08' }}> {/* AppBar for the navbar */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="https://ain.org.np/public/images/logo.png" // Replace with your logo URL
            alt="Logo"
            style={{
              height: '60px', // Adjust the size of your logo
              width: 'auto',
              marginRight: '10px',
            }}
          />
          <Typography 
            variant="h6" 
            color="white"
            className="d-none" // Add Bootstrap classes to hide it on small screens
          >
            Your Website
          </Typography>
        </Box>

        {/* Navbar Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit">Home</Button>

          {/* About Menu with hover submenu */}
          <Box sx={{ position: 'relative' }}>
            <Button color="inherit" sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
              About
            </Button>
            <Box
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                display: 'none',
                flexDirection: 'column',
                backgroundColor: '#fff',
                boxShadow: 3,
                borderRadius: 1,
                zIndex: 1,
                width: '200px',
                '&:hover': {
                  display: 'flex', // Show submenu on hover
                },
              }}
            >
              <MenuItem>
                <ListItemText>
                  <a href="#about-us" style={{ textDecoration: 'none', color: 'black' }}>About Us</a>
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>
                  <a href="#mission" style={{ textDecoration: 'none', color: 'black' }}>Our Mission</a>
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>
                  <a href="#team" style={{ textDecoration: 'none', color: 'black' }}>Our Team</a>
                </ListItemText>
              </MenuItem>
            </Box>
          </Box>

          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
