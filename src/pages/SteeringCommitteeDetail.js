import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { SettingsContext } from '../context/SettingsContext';

const ContentPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://intellisoftnepal.com.np/ain/public/api/steering-committee/${slug}`);
        setContent(response.data.data);  
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
      (match) => match.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="560"')
    );
  };

  if (loading) return <div></div>;  // Fixed loading JSX

  if (error) return <div>{error}</div>;

  if (!content) return <div>No content available</div>;  // Handle case where content is null

  return (
    <>
      <Helmet>
        <title>{content.name}</title>
        <meta name="description" content={content.education || 'No description available'} />
        <meta name="keywords" content={content.name || 'steering, committee, content'} />
        {content.image && <meta property="og:image" content={content.image} />}
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb title="Steering Committee" backgroundImage={settings?.data?.[0]?.team_bg} />

      {/* Content Section */}
      <div className="container" style={{ paddingTop: '55px', paddingBottom: '55px' }}>
        <div className="content-header">
          <div className="row">
            {/* Image on the left */}
            <div className="col-md-4">
              {content.image && (
                <img
                  src={content.image}
                  alt={content.name}
                  className="img-fluid"
                  style={{ borderRadius: '8px' }}
                />
              )}
            </div>

            {/* Content on the right */}
            <div className="col-md-8">
              <h2>{content.name}</h2>
              <p>{content.education}</p>
              <p>{content.designation} at {content.organization}</p>

              <div
                className="content-details"
                dangerouslySetInnerHTML={{ __html: updateIframeWidth(content.work_experience) }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentPage;
