import React, { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import DataTable from 'react-data-table-component'; 
import { SettingsContext } from '../context/SettingsContext';

const SteeringCommittee = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://intellisoftnepal.com.np/ain/public/api/steering-committee');
        if (response.data.success) {
          setContent(response.data.data);
        } else {
          setError('Failed to load content');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load content');
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredContent = content?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      name: 'S.N',
      selector: (row, index) => index + 1,
      sortable: true,
      width: "90px",
      textAlign: "center",
      style: {
        width: '50px',
        textAlign: 'center',
        padding: '0 5px',
      },
    },
    {
      name: 'Name',
      selector: row => (
        <a href={`/steering-committee/${row.slug}`}  rel="noopener noreferrer">
          {row.name}
        </a>
      ),
      sortable: true,
      wrap: true,
      style: {
        width: '200px',
        textOverflow: 'clip', 
        whiteSpace: 'normal', 
        overflow: 'visible', 
        textAlign: 'left',
      },
    },
    {
      name: 'Designation',
      selector: row => row.designation,
      sortable: true,
      wrap: true,
      style: {
        width: '150px',
        wordWrap: 'break-word', 
        whiteSpace: 'normal', 
        overflow: 'visible', 
        textOverflow: 'clip', 
        textAlign: 'left',
      },
    },
    {
      name: 'Organization',
      selector: row => row.organization,
      sortable: true,
      wrap: true,
      style: {
        width: '200px', 
        wordWrap: 'break-word', 
        whiteSpace: 'normal', 
        overflow: 'visible', 
        textOverflow: 'clip',
        textAlign: 'left',
      },
    },
    {
      name: 'Image',
      selector: row => (
        <a href={row.image} target="_blank" rel="noopener noreferrer">
          <img src={row.image} alt={row.name} width="100" />
        </a>
      ),
      sortable: false,
      style: {
        width: '100px',
        textAlign: 'left',
      },
    },
  ];

  const customStyles = {
    table: {
      style: {
        tableLayout: 'fixed', 
      },
    },
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'left',
        width: 'auto',
      },
    },
    cells: {
      style: {
        padding: '8px',
        fontSize: '17px',
        textAlign: 'left',
        width: 'auto',
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Steering Committee</title>
      </Helmet>

      <Breadcrumb title='Steering Committee' backgroundImage={settings?.data?.[0]?.team_bg} />

      <div className="container mt-4" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="mb-5 d-flex justify-content-end">
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <div className="input-group-prepend">
              <span className="input-group-text" style={{ backgroundColor: 'transparent', border: 'none' }}>
                <i className="fa fa-search"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : filteredContent && filteredContent.length > 0 ? (
          <DataTable
            title="Steering Committee"
            columns={columns}
            data={filteredContent}
            pagination
            highlightOnHover
            striped
            responsive
            customStyles={customStyles}
            noHeader
          />
        ) : (
          <div className="text-center">No data available</div>
        )}
      </div>
    </>
  );
};

export default SteeringCommittee;
