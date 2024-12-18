import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Typography, Button, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { motion } from 'framer-motion'; 
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

  
const articlesToShow = storyArticles.slice(0, 3);

const trimDescription = (description, wordLimit = 15) => {
  const cleanDescription = description.replace(/<[^>]*>/g, '');
  const words = cleanDescription.split(' ');
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : cleanDescription;
};

  return (
    <div className="container mt-4"> 


    <Typography
      variant="h2"
      color={'black'}
      sx={{
        mb: 2,
        mt: 10, 
        textTransform: 'uppercase', 
        fontWeight: 'bold', 
      }}
    >
      Featured Stories
    </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 10, 
          paddingTop: isMobile ? 2 : 8,  
          paddingBottom: isMobile ? 2 : 8, 
        }}
      >
        {articlesToShow.map((article, index) => (
          <motion.div
            key={index}
            variants={cardVariants} ts
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
                    justifyContent: 'center',
                    alignItems: 'center', 
                    background: 'rgba(0, 0, 0, 0.5)', 
                    color: 'white',
                    padding: 7,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2.0rem',
                      textAlign: 'left',
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: 1,
                      fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
                      color: 'white',
                      margintop: 2,
                      marginBottom: 2,
                      textAlign: 'left', 
                    }}
                  >
                    {trimDescription(article.description, 12)}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2, alignSelf: 'flex-start',}}
                    href={`/story/${article.slug}`}
                  >
                    Read More
                  </Button>
                </Box>
            </Card>
          </motion.div>
        ))}
      </Box>

      <a
          href="stories"
          style={{
            textDecoration: 'none', 
          }}
        >
          <Typography
            variant="h2"
            color={'black'}
            sx={{
              mb: 11, 
              mt: 0, 
              textTransform: 'uppercase', 
              fontWeight: 'bold',
              fontSize: '1.2rem', 
              display: 'flex', 
              justifyContent: 'flex-end', 
              textDecoration: 'underline', 
            }}
          >
            Explore More
          </Typography>
        </a>

    </div>
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
