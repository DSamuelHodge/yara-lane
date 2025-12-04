import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0 to 5
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16 }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.round(rating);
    stars.push(
      <Star 
        key={i} 
        size={size} 
        strokeWidth={isFilled ? 0 : 1.5}
        className={`star-icon ${!isFilled ? 'empty' : ''}`} 
      />
    );
  }

  return (
    <div className="star-rating" aria-label={`Rating: ${rating} out of 5 stars`}>
      {stars}
    </div>
  );
};