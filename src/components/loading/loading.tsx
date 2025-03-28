import React from 'react';

const LoadingSpinner: React.FC = () => {
  const balls = Array(8).fill(null);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex space-x-2">
        {balls.map((_, index) => (
          <div 
            key={index} 
            className={`w-4 h-4 bg-blue-500 rounded-full animate-bounce`}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: '0.5s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;