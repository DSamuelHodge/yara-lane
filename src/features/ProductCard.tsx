import React, { useState } from 'react';
import { Product } from '../types/types';
import { Plus, Heart, Check } from 'lucide-react';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick, 
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    onAddToCart(product, e);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500); // Reset after 1.5s
  };

  return (
    <div 
      className="card-group"
      onClick={() => onClick(product)}
    >
      <div className="card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
        <div className="card-overlay" />
        
        {/* Wishlist Toggle */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`wishlist-btn card-wishlist-pos ${isWishlisted ? 'active animate-heart-beat' : ''}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>

        <button
          onClick={handleAddToCart}
          className={`card-quick-add ${isAdded ? 'success' : ''}`}
          aria-label={isAdded ? "Added to cart" : `Add ${product.name} to cart`}
        >
          {isAdded ? (
            <Check className="w-5 h-5 text-stone-50 animate-pop-in" strokeWidth={2} />
          ) : (
            <Plus className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="card-title">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} size={12} />
          </div>
        </div>
        <p className="card-category">{product.category}</p>
        <p className="card-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};
