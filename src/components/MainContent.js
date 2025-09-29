import React from 'react';
import { FaBars } from 'react-icons/fa';
import PreviousRuns from './panels/PreviousRuns';
import RCAAnalysis from './panels/RCAAnalysis';
import Optimizer from './panels/Optimizer';
import UserProfile from './panels/UserProfile';

const MainContent = ({ activeMenu, sidebarCollapsed, isMobile, sidebarOpen, onToggleSidebar }) => {
  const getTitle = () => {
    switch (activeMenu) {
      case 'previous-runs':
        return 'Previous Runs';
      case 'rca':
        return 'Root Cause Analysis';
      case 'optimizer':
        return 'Process Optimizer';
      case 'profile':
        return 'User Profile';
      default:
        return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'previous-runs':
        return <PreviousRuns />;
      case 'rca':
        return <RCAAnalysis />;
      case 'optimizer':
        return <Optimizer />;
      case 'profile':
        return <UserProfile />;
      default:
        return <PreviousRuns />;
    }
  };

  return (
    <div className={`flex-1 transition-all duration-300 ${
      isMobile 
        ? 'ml-0' 
        : sidebarCollapsed ? 'ml-20' : 'ml-72'
    }`}>
      <div className="bg-white px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 shadow-theme-sm">
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded transition-colors duration-200 md:hidden"
              onClick={onToggleSidebar}
            >
              <FaBars />
            </button>
          )}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{getTitle()}</h1>
        </div>
      </div>
      <div className="p-4 md:p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainContent;
