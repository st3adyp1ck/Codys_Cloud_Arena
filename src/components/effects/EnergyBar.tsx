import React from 'react';

interface EnergyBarProps {
  value: number;
  maxValue?: number;
  height?: number;
  showText?: boolean;
  label?: string;
  className?: string;
}

const EnergyBar: React.FC<EnergyBarProps> = ({
  value,
  maxValue = 100,
  height = 8,
  showText = false,
  label = '',
  className = ''
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  // Determine energy level class
  const getEnergyLevelClass = () => {
    if (percentage >= 70) return 'high';
    if (percentage >= 30) return 'medium';
    return 'low';
  };

  return (
    <div className={`energy-bar-container ${className}`}>
      {label && <div className="text-xs mb-1 text-[#e9f1f7]/70">{label}</div>}
      <div className="energy-bar" style={{ height: `${height}px` }}>
        <div 
          className={`energy-bar-fill ${getEnergyLevelClass()}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="text-xs mt-1 text-right text-[#e9f1f7]/70">
          {value}/{maxValue}
        </div>
      )}
    </div>
  );
};

export default EnergyBar;
