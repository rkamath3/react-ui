import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RCAAnalysis = () => {
  const [recipesData, setRecipesData] = useState({ recipes: [], metadata: {}, analysis: {} });
  const [loading, setLoading] = useState(true);
  const [recipe1, setRecipe1] = useState('');
  const [recipe2, setRecipe2] = useState('');
  const [selectedMetadata, setSelectedMetadata] = useState('');
  const [comments, setComments] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [chartCollapsed, setChartCollapsed] = useState(false);
  const [analysisCollapsed, setAnalysisCollapsed] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/recipes-metadata.json');
        const jsonData = await response.json();
        setRecipesData(jsonData);
      } catch (error) {
        console.error('Error fetching recipes data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const canCompare = recipe1 && recipe2 && recipe1 !== recipe2;
  const availableMetadata = recipe1 && recipe2 && recipesData.metadata[recipe1] && recipesData.metadata[recipe2]
    ? Object.keys(recipesData.metadata[recipe1])
    : [];

  const getAnalysisText = () => {
    if (!recipe1 || !recipe2) return '';
    const key = `${recipe1}_vs_${recipe2}`;
    const reverseKey = `${recipe2}_vs_${recipe1}`;
    return recipesData.analysis[key] || recipesData.analysis[reverseKey] || 'No analysis available for this recipe combination.';
  };

  const getChartData = () => {
    if (!selectedMetadata || !recipe1 || !recipe2) return null;

    const recipe1Data = recipesData.metadata[recipe1]?.[selectedMetadata]?.timeseries || [];
    const recipe2Data = recipesData.metadata[recipe2]?.[selectedMetadata]?.timeseries || [];

    const labels = Array.from({ length: Math.max(recipe1Data.length, recipe2Data.length) }, (_, i) => `T${i + 1}`);

    return {
      labels,
      datasets: [
        {
          label: `${recipe1} - ${selectedMetadata}`,
          data: recipe1Data,
          borderColor: 'rgb(52, 152, 219)',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1,
        },
        {
          label: `${recipe2} - ${selectedMetadata}`,
          data: recipe2Data,
          borderColor: 'rgb(231, 76, 60)',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: selectedMetadata ? `${selectedMetadata} Comparison: ${recipe1} vs ${recipe2}` : 'Recipe Comparison',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time Points',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: selectedMetadata || 'Value',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  if (loading) {
    return (
      <div className="dashboard-card">
        <div className="card-body">
          <div className="loading">Loading RCA analysis data...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Recipe Comparison Setup</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Recipe 1</label>
              <select
                className="form-control"
                value={recipe1}
                onChange={(e) => {
                  setRecipe1(e.target.value);
                  setShowComparison(false);
                }}
              >
                <option value="">Select Recipe 1</option>
                {recipesData.recipes.map((recipe) => (
                  <option key={recipe} value={recipe}>
                    {recipe}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Recipe 2</label>
              <select
                className="form-control"
                value={recipe2}
                onChange={(e) => {
                  setRecipe2(e.target.value);
                  setShowComparison(false);
                }}
              >
                <option value="">Select Recipe 2</option>
                {recipesData.recipes.map((recipe) => (
                  <option key={recipe} value={recipe} disabled={recipe === recipe1}>
                    {recipe}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {canCompare && (
            <div className="mt-6 flex justify-center">
              <button
                className="btn-primary"
                onClick={() => {
                  setShowComparison(true);
                  // Auto-select first metadata parameter if none selected
                  if (!selectedMetadata && availableMetadata.length > 0) {
                    setSelectedMetadata(availableMetadata[0]);
                  }
                }}
              >
                Compare Recipes
              </button>
            </div>
          )}
        </div>
      </div>

      {showComparison && (
        <div className="dashboard-card">
          <div 
            className="card-header cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => {
              if (chartCollapsed) {
                // Opening chart, close analysis
                setChartCollapsed(false);
                setAnalysisCollapsed(true);
              } else {
                // Closing chart
                setChartCollapsed(true);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="card-title">Comparison Chart</h3>
              <div className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200">
                {chartCollapsed ? <FaChevronDown /> : <FaChevronUp />}
              </div>
            </div>
          </div>
          {!chartCollapsed && (
            <div className="card-body">
                  <div className="mb-6">
                    <label className="form-label">Metadata Parameter</label>
                    <select
                      className="form-control w-full md:max-w-sm"
                      value={selectedMetadata}
                      onChange={(e) => setSelectedMetadata(e.target.value)}
                    >
                      {availableMetadata.map((metadata) => (
                        <option key={metadata} value={metadata}>
                          {metadata.charAt(0).toUpperCase() + metadata.slice(1).replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedMetadata && (
                    <div className="relative h-64 md:h-96 w-full">
                      <Line data={getChartData()} options={chartOptions} />
                    </div>
                  )}
            </div>
          )}
        </div>
      )}

      {showComparison && (
        <div className="dashboard-card">
          <div 
            className="card-header cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => {
              if (analysisCollapsed) {
                // Opening analysis, close chart
                setAnalysisCollapsed(false);
                setChartCollapsed(true);
              } else {
                // Closing analysis
                setAnalysisCollapsed(true);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="card-title">Analysis Summary</h3>
              <div className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200">
                {analysisCollapsed ? <FaChevronDown /> : <FaChevronUp />}
              </div>
            </div>
          </div>
          {!analysisCollapsed && (
            <div className="card-body">
              <div className="space-y-6">
                <div>
                  <label className="form-label">Automated Analysis</label>
                  <textarea
                    className="analysis-field"
                    value={getAnalysisText()}
                    readOnly
                    rows="6"
                  />
                </div>
                <div>
                  <label className="form-label">Additional Comments</label>
                  <textarea
                    className="form-control"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows="4"
                    placeholder="Enter your additional analysis comments here..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!canCompare && (recipe1 || recipe2) && (
        <div className="dashboard-card">
          <div className="card-body">
            <div className="text-center text-muted">
              <p>Please select two different recipes to enable comparison and analysis.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RCAAnalysis;
