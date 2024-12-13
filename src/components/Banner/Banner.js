// src/components/Banner/Banner.js
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button } from '@mui/material';


const bannerData = [
  {
    image: 'https://www.ain.org.np/uploads/1642747149cycl.jpg',
    title: 'Welcome to Our Website',
    subtitle: 'Discover amazing features and exciting content.',
  },
  {
    image: 'https://via.placeholder.com/1920x1080/00aaff/ffffff?text=Slide+2',
    title: 'Explore Our Services',
    subtitle: 'We provide world-class services to empower your business.',
  },
  {
    image: 'https://via.placeholder.com/1920x1080/ffaa00/ffffff?text=Slide+3',
    title: 'Contact Us Today',
    subtitle: 'Let us help you achieve your goals with our expertise.',
  },
];

const Banner = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000, // 5 seconds per slide
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Enable fade animation
    arrows: false, // Hide next/prev arrows (optional)
  };

  return (
    <Slider {...settings}>
      {bannerData.map((banner, index) => (
        <Box
          key={index}
          className="banner-bg" // Apply the banner background class
          sx={{
            background: `url(${banner.image}) no-repeat center/cover`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: 4,
          }}
        >
          <Box sx={{ maxWidth: '50%' }} className="banner-content"> {/* Apply the banner content class */}
            <Typography variant="h3" color="white" sx={{ mb: 2 }}>
              {banner.title}
            </Typography>
            <Typography variant="h6" color="white" sx={{ mb: 4 }}>
              {banner.subtitle}
            </Typography>
            <Button variant="contained" color="primary" href="#read-more">
              Read More
            </Button>
          </Box>
        </Box>
      ))}
    </Slider>
  );
};

export default Banner;
