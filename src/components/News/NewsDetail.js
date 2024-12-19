import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewsBrumb from '../Breadcrumb/NewsBrumb';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

const NewsDetail = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://intellisoftnepal.com.np/ain/public/api/news/${slug}`);
        setContent(response.data.news); 
        setLoading(false);
      } catch (err) {
        setError('Failed to load content');
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  const updateIframeWidth = (htmlContent) => {
    // Replace iframe width with 100%
    return htmlContent.replace(
      /<iframe[^>]*>/g, 
      match => match.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="560"')
    );
  };

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Helmet>
          <title>{content.title}</title>
        </Helmet>

      <NewsBrumb
          title={content.title}
          backgroundImage={content.image}
      />

      <div className="container mt-4"
           style={{
            paddingBottom: "45px"
           }}> 
        
        <p>
        <i class="fa fa-calendar-check-o" aria-hidden="true" style={{marginRight: 5, display:'inline-block'}}></i>
          {moment(content.created_at).format('MMM D, YYYY')}
        </p>

        <div
          className="content-details"
          dangerouslySetInnerHTML={{ __html: updateIframeWidth(content.description) }}
        />

      </div>
    </>
  );
};

export default NewsDetail;
