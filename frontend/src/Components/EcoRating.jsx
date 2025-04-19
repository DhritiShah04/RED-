// components/EcoRating.jsx
import React from 'react';

const EcoRating = ({ rating }) => {
  return (
    <div className="flex space-x-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${i < rating ? 'text-green-600' : 'text-gray-300'}`}
        >
          🌱
        </span>
      ))}
    </div>
  );
};

export default EcoRating;
