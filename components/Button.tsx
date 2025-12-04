import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  
  const widthClass = fullWidth ? "btn-full" : "";
  
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};