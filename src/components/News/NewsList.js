import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const NewsList = () => {
  const { slug } = useParams(); 
  const [content, setContent] = useState(null);  // content is now an object containing data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://intellisoftnepal.com.np/ain/public/api/news');
        setContent(response.data); // Set the response data (which contains 'data' array)
        setLoading(false);
      } catch (err) {
        setError('Failed to load content');
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="row">
        {Array.isArray(content?.data) && content.data.length > 0 ? (
          content.data.map((item, index) => (
            <div key={index} className="col-md-4">
                <Link to={`/news/${item.slug}`}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Button variant="primary" href={item.document || '#'}>Read More</Button>
                        </Card.Body>
                    </Card>
              </Link>
            </div>
          ))
        ) : (
          <div>No news available</div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
