import React, { HTMLAttributes } from 'react';

interface FuturisticCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  withHover?: boolean;
  withGlow?: boolean;
  withScanlines?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const FuturisticCard: React.FC<FuturisticCardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  withHover = false,
  withGlow = false,
  withScanlines = false,
  title,
  subtitle,
  ...props
}) => {
  // Base classes
  const baseClasses = 'relative rounded-lg overflow-hidden backdrop-blur-sm';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-[#0a1128]/70 border border-[#00f0ff]/20',
    primary: 'bg-[#0a1128]/70 border border-[#00f0ff]/40',
    secondary: 'bg-[#0a1128]/70 border border-[#ff5e00]/40',
    accent: 'bg-[#0a1128]/70 border border-[#7b42ff]/40',
    danger: 'bg-[#0a1128]/70 border border-[#ff3366]/40',
    success: 'bg-[#0a1128]/70 border border-[#00ff88]/40'
  };
  
  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };
  
  // Hover classes
  const hoverClasses = withHover 
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
    : '';
  
  // Glow classes
  const glowClasses = withGlow ? {
    default: 'shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    primary: 'shadow-[0_0_15px_rgba(0,240,255,0.3)]',
    secondary: 'shadow-[0_0_15px_rgba(255,94,0,0.3)]',
    accent: 'shadow-[0_0_15px_rgba(123,66,255,0.3)]',
    danger: 'shadow-[0_0_15px_rgba(255,51,102,0.3)]',
    success: 'shadow-[0_0_15px_rgba(0,255,136,0.3)]'
  }[variant] : '';
  
  // Get border color for title
  const getBorderColor = () => {
    switch (variant) {
      case 'primary': return 'border-[#00f0ff]/40';
      case 'secondary': return 'border-[#ff5e00]/40';
      case 'accent': return 'border-[#7b42ff]/40';
      case 'danger': return 'border-[#ff3366]/40';
      case 'success': return 'border-[#00ff88]/40';
      default: return 'border-[#00f0ff]/20';
    }
  };
  
  // Get text color for title
  const getTitleColor = () => {
    switch (variant) {
      case 'primary': return 'text-[#00f0ff]';
      case 'secondary': return 'text-[#ff5e00]';
      case 'accent': return 'text-[#7b42ff]';
      case 'danger': return 'text-[#ff3366]';
      case 'success': return 'text-[#00ff88]';
      default: return 'text-[#00f0ff]';
    }
  };
  
  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${glowClasses}
        ${className}
      `}
      {...props}
    >
      {/* Circuit board background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        
        <div className="absolute left-0 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute left-1/4 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute left-3/4 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute right-0 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
      </div>
      
      {/* Scan lines */}
      {withScanlines && (
        <>
          <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan"></div>
          <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan" style={{ animationDelay: '1.5s' }}></div>
        </>
      )}
      
      {/* Title and subtitle */}
      {(title || subtitle) && (
        <div className={`border-b ${getBorderColor()} mb-4 pb-3`}>
          {title && (
            <h3 className={`font-['Orbitron'] font-bold text-lg ${getTitleColor()}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-[#e9f1f7]/70 text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className={`relative z-10 ${paddingClasses[padding]}`}>
        {children}
      </div>
    </div>
  );
};

export const FuturisticCardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const FuturisticCardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <h3 className={`font-['Orbitron'] font-bold text-lg text-[#00f0ff] ${className}`}>
      {children}
    </h3>
  );
};

export const FuturisticCardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

export const FuturisticCardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`mt-4 pt-3 border-t border-[#00f0ff]/20 ${className}`}>
      {children}
    </div>
  );
};
