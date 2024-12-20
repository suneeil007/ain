import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import DataTable from 'react-data-table-component';
import { SettingsContext } from '../../context/SettingsContext';

const VacancyList = () => {
  const [careers, setCareers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://intellisoftnepal.com.np/ain/public/api/career');
        setCareers(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load careers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCareers = careers?.filter((item) =>
    ['title', 'description', 'company_name']
      .some(key => item[key]?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const columns = [
    {
      name: 'S.N',
      selector: (row, index) => index + 1,
      sortable: false,
      width: '70px',
      style: { textAlign: 'center' },
    },
    {
      name: 'Job Title',
      selector: row => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Company Name',
      selector: row => row.company_name,
      sortable: true,
      wrap: true,
    },
    {
        name: 'Deadline',
        selector: row => {
          const date = new Date(row.deadline);
          const options = { day: '2-digit', month: 'short', year: 'numeric' };
          return `${date.toLocaleDateString('en-GB', options).replace(/(\w+ \w+)(,?)/, '$1,')}`;
        },
        sortable: true,
      },
    
      {
        name: 'Action',
        selector: row => (
          <div className="d-flex flex-column align-items-center">
            {row.document && (
              <a
                href={row.document}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm mb-2"
                style={{ minWidth: '100px' }}
              >
                Read More
              </a>
            )}
            {row.url && (
              <a
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-sm"
                style={{ minWidth: '100px' }}
              >
                Apply Now
              </a>
            )}
            {!row.document && !row.url && 'N/A'}
          </div>
        ),
        sortable: false,
        style: {
          textAlign: 'center',
        },
      },
  ];

  const customStyles = {
    table: {
      style: { tableLayout: 'fixed' },
    },
    headCells: {
      style: { fontSize: '16px', fontWeight: 'bold' },
    },
    cells: {
      style: { fontSize: '16px', padding: '8px' },
    },
  };

  return (
    <>
      <Helmet>
        <title>Career Opportunities</title>
      </Helmet>

      <Breadcrumb title="Career Opportunities" backgroundImage={settings?.data?.[0]?.team_bg} />

      <div className="container mt-4" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="mb-5 d-flex justify-content-end">
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text" style={{ backgroundColor: 'transparent', border: 'none' }}>
              <i className="fa fa-search"></i>
            </span>
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
        ) : filteredCareers && filteredCareers.length > 0 ? (
          <DataTable
            title="Career Opportunities"
            columns={columns}
            data={filteredCareers}
            pagination
            highlightOnHover
            striped
            responsive
            customStyles={customStyles}
            noHeader
          />
        ) : (
          <div className="text-center">No career opportunities available</div>
        )}
      </div>
    </>
  );
};

export default VacancyList;
