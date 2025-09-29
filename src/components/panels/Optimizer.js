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
  Filler,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const Optimizer = () => {
  const [recipesData, setRecipesData] = useState({ recipes: [], metadata: {} });
  const [loading, setLoading] = useState(true);
  const [recipe1, setRecipe1] = useState('');
  const [recipe2, setRecipe2] = useState('');
  const [trendsCollapsed, setTrendsCollapsed] = useState(false);
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

  const canOptimize = recipe1 && recipe2 && recipe1 !== recipe2;

  const getPieChartData = (recipeId) => {
    if (!recipeId || !recipesData.metadata[recipeId]?.optimization_contribution) {
      return null;
    }

    const contribution = recipesData.metadata[recipeId].optimization_contribution;
    const labels = Object.keys(contribution).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
    );
    const data = Object.values(contribution);
    
    const colors = [
      'rgba(70, 95, 255, 0.8)',   // brand-500
      'rgba(18, 183, 106, 0.8)',  // success-500
      'rgba(247, 144, 9, 0.8)',   // warning-500
      'rgba(240, 68, 56, 0.8)',   // error-500
    ];

    const borderColors = [
      'rgba(70, 95, 255, 1)',
      'rgba(18, 183, 106, 1)',
      'rgba(247, 144, 9, 1)',
      'rgba(240, 68, 56, 1)',
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.slice(0, data.length),
          borderColor: borderColors.slice(0, data.length),
          borderWidth: 2,
          hoverOffset: 4,
        },
      ],
    };
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      },
    },
  };

  const getOptimizationAnalysis = () => {
    if (!canOptimize) return '';
    
    const recipe1Data = recipesData.metadata[recipe1]?.optimized_value?.timeseries || [];
    const recipe2Data = recipesData.metadata[recipe2]?.optimized_value?.timeseries || [];
    
    const recipe1Avg = recipe1Data.reduce((a, b) => a + b, 0) / recipe1Data.length;
    const recipe2Avg = recipe2Data.reduce((a, b) => a + b, 0) / recipe2Data.length;
    
    const betterRecipe = recipe1Avg > recipe2Avg ? recipe1 : recipe2;
    const improvement = Math.abs(((recipe1Avg - recipe2Avg) / Math.min(recipe1Avg, recipe2Avg)) * 100);
    
    return `Optimization Analysis Results:

Recipe Performance Comparison:
• ${recipe1}: Average optimized value of ${recipe1Avg.toFixed(2)}
• ${recipe2}: Average optimized value of ${recipe2Avg.toFixed(2)}

Key Findings:
• ${betterRecipe} demonstrates superior performance with ${improvement.toFixed(1)}% higher optimization values
• ${recipe1Avg > recipe2Avg ? recipe2 : recipe1} shows potential for improvement through parameter adjustment
• Time series analysis reveals ${recipe1Avg > recipe2Avg ? recipe1 : recipe2} maintains more consistent optimization levels

Recommendations:
• Consider adopting parameters from ${betterRecipe} for improved process efficiency
• Monitor optimization trends to identify optimal operating windows
• Implement process controls to maintain peak optimization levels consistently`;
  };

  const getChartData = () => {
    if (!recipe1 || !recipe2) return null;

    const recipe1Data = recipesData.metadata[recipe1]?.optimized_value?.timeseries || [];
    const recipe2Data = recipesData.metadata[recipe2]?.optimized_value?.timeseries || [];

    const labels = Array.from({ length: Math.max(recipe1Data.length, recipe2Data.length) }, (_, i) => `T${i + 1}`);

    return {
      labels,
      datasets: [
        {
          label: `${recipe1} Optimized Value`,
          data: recipe1Data,
          borderColor: 'rgb(52, 152, 219)',
          backgroundColor: 'rgba(52, 152, 219, 0.3)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
        {
          label: `${recipe2} Optimized Value`,
          data: recipe2Data,
          borderColor: 'rgb(46, 204, 113)',
          backgroundColor: 'rgba(46, 204, 113, 0.3)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
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
        text: `Process Optimization Comparison: ${recipe1} vs ${recipe2}`,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
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
          text: 'Optimized Value',
        },
        beginAtZero: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    elements: {
      point: {
        hoverBackgroundColor: 'white',
        hoverBorderWidth: 2,
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-card">
        <div className="card-body">
          <div className="loading">Loading optimizer data...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Process Optimization Comparison</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Recipe 1</label>
              <select
                className="form-control"
                value={recipe1}
                onChange={(e) => setRecipe1(e.target.value)}
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
                onChange={(e) => setRecipe2(e.target.value)}
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
        </div>
      </div>

      {canOptimize && (
        <>
          <div className="dashboard-card">
            <div 
              className="card-header cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => {
                if (trendsCollapsed) {
                  // Opening trends, close analysis
                  setTrendsCollapsed(false);
                  setAnalysisCollapsed(true);
                } else {
                  // Closing trends
                  setTrendsCollapsed(true);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="card-title">Optimization Trends</h3>
                <div className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200">
                  {trendsCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </div>
              </div>
            </div>
            {!trendsCollapsed && (
              <div className="card-body">
                <div className="relative h-64 md:h-96 w-full">
                  <Line data={getChartData()} options={chartOptions} />
                </div>
              </div>
            )}
          </div>

          <div className="dashboard-card">
            <div 
              className="card-header cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => {
                if (analysisCollapsed) {
                  // Opening analysis, close trends
                  setAnalysisCollapsed(false);
                  setTrendsCollapsed(true);
                } else {
                  // Closing analysis
                  setAnalysisCollapsed(true);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="card-title">Optimization Analysis</h3>
                <div className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200">
                  {analysisCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </div>
              </div>
            </div>
            {!analysisCollapsed && (
              <div className="card-body">
                <div className="space-y-6">
                  {/* Pie Charts Section */}
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Metadata Contribution Analysis</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Recipe 1 Pie Chart */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3 text-center">{recipe1} - Optimization Factors</h5>
                        {getPieChartData(recipe1) ? (
                          <div className="relative h-64 w-full">
                            <Pie data={getPieChartData(recipe1)} options={pieChartOptions} />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-64 text-gray-500">
                            <p>No contribution data available for {recipe1}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Recipe 2 Pie Chart */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3 text-center">{recipe2} - Optimization Factors</h5>
                        {getPieChartData(recipe2) ? (
                          <div className="relative h-64 w-full">
                            <Pie data={getPieChartData(recipe2)} options={pieChartOptions} />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-64 text-gray-500">
                            <p>No contribution data available for {recipe2}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Analysis Text Section */}
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Detailed Analysis</h4>
                    <textarea
                      className="analysis-field"
                      value={getOptimizationAnalysis()}
                      readOnly
                      rows="12"
                      style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!canOptimize && (recipe1 || recipe2) && (
        <div className="dashboard-card">
          <div className="card-body">
            <div className="text-center text-muted">
              <p>Please select two different recipes to enable optimization comparison.</p>
            </div>
          </div>
        </div>
      )}

      {!recipe1 && !recipe2 && (
        <div className="dashboard-card">
          <div className="card-body">
            <div className="text-center text-muted">
              <p>Select recipes to view optimization analysis and comparison charts.</p>
              <p className="mt-2">The optimizer analyzes process efficiency and provides recommendations for parameter optimization.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Optimizer;
