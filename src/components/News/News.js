import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, Button, Stack } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function News() {
  const newsList = [
    {
      id: 1,
      title: 'Lizard',
      description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.',
      image: 'https://www.ain.org.np/uploads/1643098306Alisha_Budha_s%20Story_Community-based.jpg',
    },
    {
      id: 2,
      title: 'Chameleon',
      description: 'Chameleons are a distinctive and highly specialized clade of lizards known for their ability to change color.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chamaeleo_calyptratus_on_tree.jpg/640px-Chamaeleo_calyptratus_on_tree.jpg',
    },
    {
      id: 3,
      title: 'Gecko',
      description: 'Geckos are small, nocturnal lizards found in warm climates. They are known for their unique vocalizations.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/House_Gecko_%28Hemidactylus_sp.%29.jpg/640px-House_Gecko_%28Hemidactylus_sp.%29.jpg',
    },
  ];

  return (
    <section style={{ width: '100%', backgroundColor: '#f1f1f1', padding: '80px 0' }}>
      <div className="container" style={{ display: 'flex', gap: '20px' }}>
        {/* Left Side - Featured Card */}
        <div style={{ flex: 1 }}>
        <Card sx={{ height: '100%', position: 'relative', color: 'white' }}>
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            {/* Background Image */}
            <CardMedia
              sx={{ height: '100%', filter: 'brightness(0.7)' }}
              image="https://www.ain.org.np/uploads/1643098306Alisha_Budha_s%20Story_Community-based.jpg"
              title="Featured News"
            />
            {/* Overlay Content */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                textAlign: 'left',
              }}
            >
              <Typography variant="h5" component="div" gutterBottom>
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>
                july 24, 2024
              </Typography>
              <Button variant="contained" color="primary" size="small">
                Learn More
              </Button>
            </div>
          </div>
        </Card>

        </div>

        {/* Right Side - News List */}
        <div style={{ flex: 1 }}>
          {newsList.map((news) => (
            <div
              key={news.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                style={{ width: '150px', height: '100px', objectFit: 'cover' }}
                image={news.image}
                alt={news.title}
              />
              <div style={{ flex: 1, padding: '16px' }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {news.title}
                </Typography>
                <Typography variant="body2" style={{ color: '#666' }}>
                  {news.description}
                </Typography>
                <Button size="small" style={{ marginTop: '10px' }}>
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
