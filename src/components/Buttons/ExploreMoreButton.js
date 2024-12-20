import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const ExploreMoreButton = ({ href, label, color = 'white', hoverColor = '#f39c12' }) => {
  return (
    <a
      href={href}
      style={{
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%', 
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          cursor: 'pointer',
          transition: 'color 0.3s ease, transform 0.3s ease',
          color,
          '&:hover': {
            color: hoverColor,
            transform: 'translateX(-5px)',
          },
          '& > .icon': {
            marginLeft: '0px',
            opacity: 0,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            transform: 'translateX(-5px)',
          },
          '&:hover > .icon': {
            marginLeft: '10px',
            opacity: 1,
            transform: 'translateX(0)',
          },
        }}
      >
        {label}
        <i
          className="fa fa-arrow-right icon"
          style={{
            fontSize: '1rem',
          }}
        ></i>
      </Typography>
    </a>
  );
};

ExploreMoreButton.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
};

export default ExploreMoreButton;
