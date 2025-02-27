import React from 'react';

export const Card = ({ className, children }) => {
  return (
    <div className={`rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h2 className={`text-xl font-semibold ${className}`}>
      {children}
    </h2>
  );
};

export const CardContent = ({ className, children }) => {
  return (
    <div className={`p-4 pt-0 ${className}`}>
      {children}
    </div>
  );
};

export default Card;