import React, { useState, useEffect, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa';

const PreviousRuns = () => {
  const [data, setData] = useState({ columns: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/previous-runs.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data.data;
    
    return data.data.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data.data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    const column = data.columns.find(col => col.key === key);
    if (!column || !column.sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    const column = data.columns.find(col => col.key === key);
    if (!column || !column.sortable) return null;

    if (sortConfig.key !== key) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="sort-icon" /> : 
      <FaSortDown className="sort-icon" />;
  };

  const formatCellValue = (value, key) => {
    if (key === 'ET') {
      return value ? 'Yes' : 'No';
    }
    if (typeof value === 'number' && !Number.isInteger(value)) {
      return value.toFixed(2);
    }
    return value;
  };

  if (loading) {
    return (
      <div className="dashboard-card">
        <div className="card-body">
          <div className="flex justify-center items-center h-48">
            <div className="text-lg text-brand-500">Loading previous runs data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">Previous Runs Data</h3>
      </div>
      <div className="card-body">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="search-box w-full md:max-w-sm">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search runs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="text-sm text-gray-500 text-center md:text-right">
            Showing {sortedData.length} of {data.data.length} runs
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {data.columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className={column.sortable ? 'cursor-pointer hover:bg-gray-100' : 'cursor-default'}
                  >
                    <div className="flex items-center gap-2">
                      {column.title}
                      {getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={row.ET ? 'error-row' : ''}
                >
                  {data.columns.map((column) => (
                    <td key={column.key}>
                      {formatCellValue(row[column.key], column.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 && (
          <div className="text-center mt-6">
            <p className="text-gray-500">No runs found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousRuns;
