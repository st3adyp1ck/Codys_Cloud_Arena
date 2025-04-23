import React, { ButtonHTMLAttributes } from 'react';

interface FuturisticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  glowing?: boolean;
  className?: string;
}

const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  glowing = false,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'relative font-["Orbitron"] font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden flex items-center justify-center';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3 rounded',
    md: 'text-sm py-2 px-4 rounded-md',
    lg: 'text-base py-3 px-6 rounded-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#00a2b3] to-[#00f0ff] text-[#0a1128] hover:from-[#00f0ff] hover:to-[#7df9ff]',
    secondary: 'bg-gradient-to-r from-[#ff5e00] to-[#ff8c47] text-white hover:from-[#ff8c47] hover:to-[#ffaa7a]',
    accent: 'bg-gradient-to-r from-[#6930c3] to-[#7b42ff] text-white hover:from-[#7b42ff] hover:to-[#9e76ff]',
    danger: 'bg-gradient-to-r from-[#c9184a] to-[#ff3366] text-white hover:from-[#ff3366] hover:to-[#ff6690]',
    success: 'bg-gradient-to-r from-[#0a9396] to-[#00ff88] text-[#0a1128] hover:from-[#00ff88] hover:to-[#66ffbb]'
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Glow classes
  const glowClasses = glowing ? {
    primary: 'shadow-[0_0_15px_rgba(0,240,255,0.5)]',
    secondary: 'shadow-[0_0_15px_rgba(255,94,0,0.5)]',
    accent: 'shadow-[0_0_15px_rgba(123,66,255,0.5)]',
    danger: 'shadow-[0_0_15px_rgba(255,51,102,0.5)]',
    success: 'shadow-[0_0_15px_rgba(0,255,136,0.5)]'
  }[variant] : '';
  
  // Disabled classes
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:-translate-y-1 active:translate-y-0';
  
  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClasses}
        ${glowClasses}
        ${disabledClasses}
        ${className}
      `}
      {...props}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full"></span>
      </span>
      
      {/* Border glow */}
      {glowing && (
        <span className="absolute inset-0 rounded-md opacity-30 animate-pulse" style={{ 
          background: `linear-gradient(45deg, transparent, ${
            variant === 'primary' ? '#00f0ff' : 
            variant === 'secondary' ? '#ff5e00' : 
            variant === 'accent' ? '#7b42ff' : 
            variant === 'danger' ? '#ff3366' : 
            '#00ff88'
          }, transparent)` 
        }}></span>
      )}
      
      {/* Content */}
      <span className="flex items-center justify-center">
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </span>
    </button>
  );
};

export default FuturisticButton;
