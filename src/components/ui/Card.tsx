import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const hoverStyles = hover 
    ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300' 
    : '';

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg p-6 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
