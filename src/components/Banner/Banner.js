import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    axios.get('https://intellisoftnepal.com.np/ain/public/api/banners')
      .then((response) => {
        if (response.data.success) {
          setBannerData(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching banner data:', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, 
    arrows: false, 
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Slider {...settings}>
      {bannerData.map((banner, index) => (
        <Box
          key={banner.id}
          className="banner-bg"
          sx={{
            background: `url(${banner.image}) no-repeat center/cover`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '8px',
              padding: '35px',
            }}
            className="banner-content"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textAnimation}
            >
              <Typography
                variant="h3"
                color={banner.title_color || 'white'}
                sx={{
                  mb: 2,
                  fontSize: {
                    xs: '1.5rem',  
                    sm: '2rem',    
                    md: '2.25rem', 
                  },
                }}
              >
                {banner.title}
              </Typography>
              <Typography variant="h6" color={banner.description_color || 'white'} sx={{ mb: 4 }}>
                {banner.description}
              </Typography>
              {banner.url && (
                <Button variant="contained" color="primary" href={banner.url} target="_blank">
                  Read More
                </Button>
              )}
            </motion.div>
          </Box>
        </Box>
      ))}
    </Slider>
  );
};

export default Banner;
