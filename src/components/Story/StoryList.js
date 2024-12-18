import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Typography, Button, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { motion } from 'framer-motion'; 
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import axios from 'axios';

const Story = () => {
  const [storyArticles, setStoryArticles] = useState([]);

  useEffect(() => {
    axios.get('https://intellisoftnepal.com.np/ain/public/api/stories')
      .then((response) => {
        if (response.data.success) {
          setStoryArticles(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching story data:', error);
      });
  }, []);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm')); 
  const isTablet = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md')); 

  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, 
  };

  const trimDescription = (description, wordLimit = 15) => {
    const cleanDescription = description.replace(/<[^>]*>/g, '');
    const words = cleanDescription.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : cleanDescription;
  };

  return (
    <>
      <Breadcrumb
        title="Featured Stories"
        backgroundImage=""
      />

      <div className="container mt-4"> 
        {storyArticles.length > 0 && (
          <motion.div
            variants={cardVariants} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} 
          >
            <Card
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden', 
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
                marginTop: 7,
                marginBottom: 0, 
              }}
            >
              <CardMedia
                component="img"
                image={storyArticles[0].image}
                alt={storyArticles[0].title}
                sx={{
                  objectFit: 'cover', 
                  height: isMobile ? '300px' : '600px', 
                  width: '100%', 
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0, 
                  width: '100%',
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start', 
                  background: 'rgba(0, 0, 0, 0.5)', 
                  color: 'white',
                  padding: 5,
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  {storyArticles[0].title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 2,
                    color: 'white',
                    textAlign: 'left', 
                  }}
                >
                  {trimDescription(storyArticles[0].description, 20)}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  href={`/story/${storyArticles[0].slug}`}
                >
                  Read More
                </Button>
              </Box>
            </Card>
          </motion.div>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 10, 
            paddingTop: isMobile ? 2 : 8,  
            paddingBottom: isMobile ? 2 : 8, 
          }}
        >
          {storyArticles.slice(1).map((article, index) => (
            <motion.div
              key={index}
              variants={cardVariants} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} 
            >

            <a href={`/story/${article.slug}`} style={{ textDecoration: 'none' }}>
            <Card
                sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                    '& .title': {
                    color: '#feca07', 
                    },
                },
                }}
            >
                <CardMedia
                component="img"
                image={article.image}
                alt={article.title}
                sx={{
                    objectFit: 'cover',
                    height: '450px',
                    width: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                    transform: 'scale(1.1)',
                    },
                }}
                />
                <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: 5,
                    borderRadius: 2,
                }}
                >
                <Typography
                    className="title"
                    variant="h6"
                    component="div"
                    sx={{
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1.5rem' : isTablet ? '1.75rem' : '1.4rem',
                    textAlign: 'center',
                    lineHeight: 1.4,
                    transition: 'color 0.3s ease-in-out', // Smooth color transition
                    }}
                >
                    {article.title}
                </Typography>
                </Box>
            </Card>
            </a>


            </motion.div>
          ))}
        </Box>
      </div>
    </>
  );
};

const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};

export default App;
