import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModuleBreadcrumbs from '../Breadcrumb/ModuleBreadcrumbs'; // Correct relative import
import axios from 'axios';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';


const StoryDetail = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchContent = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`https://intellisoftnepal.com.np/ain/public/api/story/${slug}`);
          // console.log(response.data); 

          if (response.data && response.data.story) {
            setContent(response.data.story);
          } else {
            setError('Story not found');
          }


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

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <>

         <Helmet>
            <title>{content.title}</title>
          </Helmet>
    
        <ModuleBreadcrumbs
            title={content.title}
            backgroundImage={content.image}
        />

        <div className="container mt-4"> 
        <table className="content-info-table" style={{ width: '50%', marginTop: '40px', marginBottom: '40px', borderCollapse: 'collapse' }}>
           
            <tbody>
                <tr>
                    {content.content_creator && (
                        <>
                        <td style={{ padding: '8px' }}><strong>Author:</strong></td>
                        <td style={{ padding: '8px' }}>{content.content_creator}</td>
                        </>
                    )}
                    </tr>

                    <tr>
                    {content.country_featured && (
                        <>
                        <td style={{ padding: '8px' }}><strong>Country:</strong></td>
                        <td style={{ padding: '8px' }}>{content.country_featured}</td>
                        </>
                    )}
                    </tr>

                    <tr>
                    {content.resource_type && (
                        <>
                        <td style={{ padding: '8px' }}><strong>Resource Type:</strong></td>
                        <td style={{ padding: '8px' }}>{content.resource_type}</td>
                        </>
                    )}
                    </tr>

                    <tr>
                    {content.consent_received && (
                        <>
                        <td style={{ padding: '8px' }}><strong>Consent Received:</strong></td>
                        <td style={{ padding: '8px' }}>{content.consent_received}</td>
                        </>
                    )}
                    </tr>

                    <tr>
                    {content.special_instructions && (
                        <>
                        <td style={{ padding: '8px' }}><strong>Special Instructions:</strong></td>
                        <td style={{ padding: '8px' }}>{content.special_instructions}</td>
                        </>
                    )}
                    </tr>
            </tbody>
        </table>


<p>
<i class="fa fa-calendar-check-o" aria-hidden="true" style={{marginRight: 5, display:'inline-block'}}></i>
   {moment(content.date).format('MMM D, YYYY')}
</p>
        <blockquote style={{ marginBottom:40}}>
          <h3 style={{ lineHeight: '1.6' }}>{content.summary}</h3>
      </blockquote>

        <div
            style={{ marginBottom:40}}
            className="content-details"
            dangerouslySetInnerHTML={{ __html: updateIframeWidth(content.description) }}
        />

        </div>
    </>
  );
};

export default StoryDetail;
