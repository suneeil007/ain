import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ContentPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://intellisoftnepal.com.np/ain/public/api/pages/${slug}`);
        setContent(response.data.page);
        setLoading(false);
      } catch (err) {
        setError('Failed to load content');
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  const updateIframeWidth = (htmlContent) => {
 
    return htmlContent.replace(
      /<iframe[^>]*>/g, 
      match => match.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="560"')
    );
  };

  if (loading) return
   <div>...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4"> 
      <h1>{content.title}</h1>
      <p>{content.keywords}</p>

     
      <div
        className="content-details"
        dangerouslySetInnerHTML={{ __html: updateIframeWidth(content.details) }}
      />

      {/* Optionally, render the image */}
      {content.image && <img src={content.image} alt={content.title} className='d-none'/>}
    </div>
  );
};

export default ContentPage;
