import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExploreMoreButton from '../Buttons/ExploreMoreButton';

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    axios
      .get('https://intellisoftnepal.com.np/ain/public/api/news')
      .then((response) => {
        if (response.data && response.data.success) {
          setNewsList(response.data.data); 
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  const featuredNews = newsList.length > 0 ? newsList[0] : null;
  const newsItems = newsList.slice(1, 4); 

  return (
    <section style={{ width: '100%', backgroundColor: '#fff', padding: '80px 0' }}>
      <div className="container">
        <Typography
          variant="h2"
          color={'black'}
          sx={{
            paddingTop: 3,
            paddingBottom: 10,
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          News AND EVENTS
        </Typography>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'row', gap: '100px', flexWrap: 'wrap' }}>
        {featuredNews && (
          <div style={{ flex: 1, minWidth: '300px', marginBottom: '20px' }}>
            <Card sx={{ height: '100%', position: 'relative', color: 'white' }}>
              <div style={{ position: 'relative', height: '565px', overflow: 'hidden' }}>
                <CardMedia
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.7)',
                  }}
                  image={featuredNews.image || 'https://via.placeholder.com/150'}
                  title="Featured News"
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#003153',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#fff',
                      textAlign: 'center',
                      fontSize: '1.5em',
                      fontWeight: 'bolder',
                    }}
                  >
                     {moment(featuredNews.created_at).format('MMM D ')} 
                      <br />
                     {moment(featuredNews.created_at).format('YYYY')}
                  </Typography>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: '30px',
                    borderRadius: '4px',
                    padding: '25px',
                    background: '#003153',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    textAlign: 'left',
                    width: '60%',
                  }}
                >
                  <Typography
                    variant="h4"
                    component="a"
                    href={`/news/${featuredNews.slug}`}
                    gutterBottom
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {featuredNews.title}
                  </Typography>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: 'white' }}>
                    <i className="fa fa-clock-o" aria-hidden="true" style={{ fontSize: '1.3em' }}></i>
                    <Typography variant="body1" style={{ fontSize: '1.1em', color: 'white', marginLeft: '0.4em' }}>
                      {featuredNews.location || 'Location not available'}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <i className="fa fa-map-marker" aria-hidden="true" style={{ fontSize: '1.3em' }}></i>
                    <Typography variant="body1" style={{ fontSize: '1.1em', color: 'white', marginLeft: '0.4em' }}>
                      {featuredNews.time || 'Time not available'}
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div style={{ flex: 1, minWidth: '300px' }}>
          {loading ? (
            <Typography variant="h6" color="textSecondary">
              Loading...
            </Typography>
          ) : (
            newsItems.map((news) => (
              <div
                key={news.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '40px',
                  background: '#fff',
                  borderRadius: '8px',
                  borderLeft: '10px solid #003153',
                  overflow: 'hidden',
                  flexDirection: 'row',
                  padding: '16px',
                  gap: '26px',
                  width: '100%',
                }}
              >
                <div style={{ flex: 0, minWidth: '100px', textAlign: 'center' }}>
                <Typography
                    variant="body2"
                    sx={{
                      color: '#000',
                      fontSize: '1.2em',
                      fontWeight: 'bolder',
                      lineHeight: '1.5',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.3em', // Larger size for "7 July,"
                        fontWeight: 'bold',
                      }}
                    >
                      {moment(news.created_at).format('MMM D ')}
                    </span>
                    <br />
                     {moment(news.created_at).format('YYYY')}
                  </Typography>
                </div>


                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    component="a"
                    href={`/news/${news.slug}`}
                    sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bolder' }}
                  >
                    {news.title}
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px',
                      marginTop: '8px',
                      color: 'black',
                    }}
                  >
                    <i className="fa fa-clock-o" aria-hidden="true" style={{ fontSize: '1.3em' }}></i>
                    <Typography variant="body1" style={{ fontSize: '1.1em', color: 'black', marginLeft: '0.4em' }}>
                      {featuredNews.location || 'Location not available'}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
                    <i className="fa fa-map-marker" aria-hidden="true" style={{ fontSize: '1.3em' }}></i>
                    <Typography variant="body1" style={{ fontSize: '1.1em', color: 'black', marginLeft: '0.4em' }}>
                      {featuredNews.time || 'Time not available'}
                    </Typography>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
                       
      </div>
          <div className="container d-flex justify-content-end">
                      <ExploreMoreButton 
                        href="/news" 
                        label="Explore More" 
                        color="black" 
                        hoverColor="#f39c12"
                      />
             </div>                        
    </section>
  );
}
