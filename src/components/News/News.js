import React from 'react';
import { Box, Card, CardMedia, Typography, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const newsArticles = [
  { title: "Pedal Power: I Never Miss a Day at School", image: "https://www.ain.org.np/uploads/1643032157W260-0372-011.jpg", url: "#link1" },
  { title: "Clean Water for a Better Future", image: "https://www.ain.org.np/uploads/1643032157W260-0372-011.jpg", url: "#link2" },
  { title: "Safe Accessible Water for Rural Nepal", image: "https://www.ain.org.np/uploads/1643032157W260-0372-011.jpg", url: "#link3" },
];

const News = () => {
  // Media queries for responsive layout
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm')); // For mobile
  const isTablet = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md')); // For tablets

  // Define number of columns based on the screen size
  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <div className="custom_container mt-4"> {/* Bootstrap container */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`, // Adjust columns based on screen size
          gap: 10, // Space between items
          padding: isMobile ? 2 : 8, // Less padding on small screens
        }}
      >
        {newsArticles.map((article, index) => (
          <Card
            key={index}
            sx={{
              position: 'relative', // For positioning the title over the image
              borderRadius: 2, // Rounded corners
              overflow: 'hidden', // Clip content inside the card
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Elegant shadow
            }}
          >
            <CardMedia
              component="img"
              image={article.image}
              alt={article.title}
              sx={{
                objectFit: 'cover', // Ensure the image covers the space correctly
                borderRadius: '10px', // Optional: rounded corners
              }}
            />
            {/* Title with no background */}
            <Box
              sx={{
                position: 'absolute', // Float the title over the image
                bottom: 0, // Position at the bottom
                width: '100%', // Full width of the card
                textAlign: 'center', // Center the text
                padding: 2, // Padding inside the title box
                background: 'rgba(0, 0, 0, 0.5)', // Optional: slightly darkened background for readability
              }}
            >
              <a
                href={article.url}  // Anchor tag with the URL
                style={{
                  textDecoration: 'none', // Remove default underline
                  color: 'white', // White text
                  fontSize: isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2.0rem', // Adjust font size based on screen size
                  fontWeight: 'bold', // Make title bold
                  lineHeight: 1.2, // Adjust line height
                  display: 'block', // Make it block-level for better spacing on smaller screens
                  paddingBottom: '1rem', // Add bottom padding for better spacing
                }}
              >
                {article.title}
              </a>
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
};

const App = () => {
  const theme = createTheme(); // You can customize the theme if needed
  return (
    <ThemeProvider theme={theme}>
      <News />
    </ThemeProvider>
  );
};

export default App;
