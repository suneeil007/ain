import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';


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
 <>

      <Helmet>
        <title>{content.title}</title>
        <meta name="description" content={content.keywords || 'No description available'} />
        <meta name="keywords" content={content.keywords || 'content, page, react'} />
        {content.image && <meta property="og:image" content={content.image} />}
      </Helmet>

      
    <Breadcrumb
    title={content.title}
    backgroundImage={content.image}
    />

    <div className="container"
         style={{
          paddingTop: '55px',
          paddingBottom: '55px',
         }}> 


     
      <div
        className="content-details"
        dangerouslySetInnerHTML={{ __html: updateIframeWidth(content.details) }}
      />

      {/* Optionally, render the image */}
      {content.image && <img src={content.image} alt={content.title} className='d-none'/>}
    </div>

 </>
  
  ); 
};

export default ContentPage;
