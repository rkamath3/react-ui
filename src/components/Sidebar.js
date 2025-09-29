import React from 'react';
import { 
  FaSearch, 
  FaUser, 
  FaBars,
  FaDatabase,
  FaChartArea
} from 'react-icons/fa';
import SEMICopilotLogo from './SEMICopilotLogo';

const Sidebar = ({ activeMenu, onMenuChange, collapsed, onToggle, isMobile, sidebarOpen }) => {
  const menuItems = [
    {
      id: 'previous-runs',
      label: 'Previous Runs',
      icon: <FaDatabase />
    },
    {
      id: 'rca',
      label: 'RCA Analysis',
      icon: <FaSearch />
    },
    {
      id: 'optimizer',
      label: 'Optimizer',
      icon: <FaChartArea />
    }
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-theme-sm transition-all duration-300 z-50 ${
      isMobile 
        ? `w-72 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
        : collapsed ? 'w-20' : 'w-72'
    }`}>
      <div className="flex items-center gap-3 px-4 py-4 md:py-6 border-b border-gray-200">
        {(!collapsed || isMobile) ? (
          <SEMICopilotLogo size="small" className="flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            SC
          </div>
        )}
        <button 
          className="ml-auto p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded transition-colors duration-200"
          onClick={onToggle}
        >
          <FaBars />
        </button>
      </div>
      
      <div className="flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
        <nav className="flex-1 px-3 pt-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`menu-item w-full ${
                  activeMenu === item.id ? 'menu-item-active' : 'menu-item-inactive'
                } ${(collapsed && !isMobile) ? 'justify-center' : 'justify-start'}`}
                onClick={() => onMenuChange(item.id)}
              >
                <span className={`menu-item-icon-size ${
                  activeMenu === item.id ? 'menu-item-icon-active' : 'menu-item-icon'
                }`}>
                  {item.icon}
                </span>
                {(!collapsed || isMobile) && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-gray-200 p-3">
          <button
            className={`menu-item w-full ${
              activeMenu === 'profile' ? 'menu-item-active' : 'menu-item-inactive'
            } ${(collapsed && !isMobile) ? 'justify-center' : 'justify-start'}`}
            onClick={() => onMenuChange('profile')}
          >
            <span className={`menu-item-icon-size ${
              activeMenu === 'profile' ? 'menu-item-icon-active' : 'menu-item-icon'
            }`}>
              <FaUser />
            </span>
            {(!collapsed || isMobile) && (
              <span className="text-sm font-medium">User Profile</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
