import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import moment from 'moment';

const NewsList = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://intellisoftnepal.com.np/ain/public/api/news');
        setContent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load content');
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Helmet>
        <title>News AND EVENTS</title>
      </Helmet>

      <Breadcrumb title="News And Events" backgroundImage="" />
      <div className="container">
        <div
          className="row"
          style={{ paddingTop: '70px', paddingBottom: '25px' }}
        >
          {Array.isArray(content?.data) && content.data.length > 0 ? (
            content.data.map((item, index) => (
              <motion.div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Link to={`/news/${item.slug}`} style={{ textDecoration: 'none' }}>
                  <Card className="h-100">
                    <div className="image-container">
                      <Card.Img
                        variant="top"
                        src={item.image}
                        className="img-fluid"
                      />

                       <div className="date-badge"
                             style={{
                              textAlign:"center"
                             }}>
                          <span className="date-top"
                                style={{
                                  fontSize:"1.6em",
                                  fontWeight:"bolder"
                                }}>
                            {moment(item.created_at).format('MMM D ')}
                          </span>
                          <br/>
                          <span className="date-bottom"
                                style={{
                                  fontSize:"1.6em",
                                  fontWeight:"normal"
                                }}>
                            {moment(item.created_at).format('YYYY')}
                          </span>
                        </div>


                    </div>
                    <Card.Body>
                      <Card.Title className="text-dark">{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No news available</p>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          .image-container {
            position: relative;
            height: 200px; 
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .image-container img {
            object-fit: cover;
            height: 100%;
            width: 100%;
          }

          .date-badge {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 12px;
          }

          .card {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border: none;
            transition: box-shadow 0.3s ease-in-out;
          }

          .card:hover {
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
          }

          .card:hover .card-title {
            color: #feca07 !important;
            transition: color 0.3s ease-in-out;
          }
        `}
      </style>
    </>
  );
};

export default NewsList;
