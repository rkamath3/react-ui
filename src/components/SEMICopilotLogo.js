import React from 'react';

const SEMICopilotLogo = ({ size = 'normal', className = '' }) => {
  const dimensions = {
    small: { width: 80, height: 27 },
    normal: { width: 140, height: 47 },
    large: { width: 180, height: 60 }
  };

  const { width, height } = dimensions[size] || dimensions.normal;

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 120 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="18" fill="#465fff" stroke="#ffffff" strokeWidth="2"/>
      
      {/* Semiconductor wafer design */}
      <circle cx="20" cy="20" r="12" fill="#ffffff" opacity="0.9"/>
      <circle cx="20" cy="20" r="8" fill="none" stroke="#465fff" strokeWidth="1"/>
      <circle cx="20" cy="20" r="4" fill="none" stroke="#465fff" strokeWidth="1"/>
      
      {/* Grid pattern for semiconductor */}
      <line x1="12" y1="20" x2="28" y2="20" stroke="#465fff" strokeWidth="0.5"/>
      <line x1="20" y1="12" x2="20" y2="28" stroke="#465fff" strokeWidth="0.5"/>
      <line x1="16" y1="16" x2="24" y2="24" stroke="#465fff" strokeWidth="0.5"/>
      <line x1="24" y1="16" x2="16" y2="24" stroke="#465fff" strokeWidth="0.5"/>
      
      {/* Small connection points */}
      <circle cx="16" cy="16" r="1" fill="#465fff"/>
      <circle cx="24" cy="16" r="1" fill="#465fff"/>
      <circle cx="16" cy="24" r="1" fill="#465fff"/>
      <circle cx="24" cy="24" r="1" fill="#465fff"/>
      
      {/* Text */}
      <text x="45" y="16" fontFamily="'Outfit', sans-serif" fontSize="14" fontWeight="700" fill="#344054">SEMI</text>
      <text x="45" y="30" fontFamily="'Outfit', sans-serif" fontSize="14" fontWeight="700" fill="#465fff">Copilot</text>
      
      {/* Small accent dot */}
      <circle cx="110" cy="12" r="2" fill="#12b76a"/>
    </svg>
  );
};

export default SEMICopilotLogo;
