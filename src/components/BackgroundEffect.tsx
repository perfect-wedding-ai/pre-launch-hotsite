import React from 'react';

interface BackgroundEffectProps {
  className?: string;
  children?: React.ReactNode;
}

const BackgroundEffect: React.FC<BackgroundEffectProps> = ({ 
  className = '', 
  children
}) => {
  const gradientOpacity = "0.2";
  const blurOpacity = "0.15";
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient circles for background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,192,203,${gradientOpacity})_0%,rgba(255,192,203,0)_70%)]`}></div>
        <div className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,192,203,${gradientOpacity})_0%,rgba(255,192,203,0)_70%)]`}></div>
        
        {/* Blur effects */}
        <div className={`absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[#FFC0CB] opacity-[${blurOpacity}] blur-[90px]`}></div>
        <div className={`absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#FFC0CB] opacity-[${blurOpacity}] blur-[90px]`}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-[1]">
        {children}
      </div>
    </div>
  );
};

export default BackgroundEffect; 