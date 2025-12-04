import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingBag, Heart, Share2, Check } from 'lucide-react';
import { Product } from '../types';
import { Button } from './Button';
import { StarRating } from './StarRating';
import { generateProductDescription } from '../services/geminiService';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  isWishlisted,
  onToggleWishlist 
}) => {
  const [description, setDescription] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setDescription(product.shortDescription);
      setHasGenerated(false);
      setIsGenerating(false);
      setIsAdded(false);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !product) return null;

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    const story = await generateProductDescription(product);
    setDescription(story);
    setIsGenerating(false);
    setHasGenerated(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Yara Lane - ${product.name}`,
          text: `Check out ${product.name} on Yara Lane.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Revert after 2s
  };

  return (
    <div className="modal-container">
      {/* Backdrop */}
      <div 
        className="modal-backdrop"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="modal-content animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="modal-close-btn"
        >
          <X className="w-5 h-5 text-stone-900" />
        </button>

        {/* Scroll Area for Content */}
        <div className="modal-scroll-area">
          {/* Image Section */}
          <div className="w-full md:w-1/2 min-h-[50vh] bg-stone-200">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-stone-50">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                   <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-stone-500">({product.reviews.length} reviews)</span>
                  </div>
                </div>
               
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xl font-medium text-stone-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="h-px w-full bg-stone-200" />

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 flex items-center gap-2">
                  The Ritual
                  {hasGenerated && <Sparkles className="w-4 h-4 text-accent animate-pulse-gentle" />}
                </h3>
                
                <div className={`text-stone-600 leading-relaxed transition-all duration-500 ${isGenerating ? 'opacity-50 blur-[1px]' : 'opacity-100'}`}>
                  {description}
                </div>

                {!hasGenerated && (
                  <button
                    onClick={handleGenerateStory}
                    disabled={isGenerating}
                    className="flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-900 hover:text-emerald-700 transition-colors uppercase border-b border-emerald-900/30 pb-0.5 hover:border-emerald-900"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isGenerating ? "Curating..." : "Reveal Brand Story with AI"}
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Key Elements</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full border border-stone-200">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-actions">
               <Button 
                fullWidth 
                size="lg" 
                onClick={handleAddToCart}
                className={`group flex-1 transition-colors duration-300 ${isAdded ? 'bg-emerald-800 hover:bg-emerald-900' : ''}`}
                disabled={isAdded}
              >
                {isAdded ? "Added to Bag" : "Add to Bag"}
                {isAdded ? (
                  <Check className="ml-2 w-4 h-4" />
                ) : (
                  <ShoppingBag className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </Button>
              
              <button 
                onClick={() => onToggleWishlist(product)}
                className={`wishlist-btn p-3 border border-stone-200 rounded-sm ${isWishlisted ? 'active' : ''}`}
                title="Wishlist"
              >
                <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
              </button>

              <div className="relative">
                <button 
                  onClick={handleShare}
                  className="wishlist-btn p-3 border border-stone-200 rounded-sm"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <div className={`share-feedback ${showShareTooltip ? 'visible' : ''}`}>
                  Link Copied
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="review-section">
               <h3 className="review-header">
                 <span>Reviews</span>
                 <span className="text-sm font-sans font-normal text-stone-500">
                   Average {product.rating} / 5
                 </span>
               </h3>
               
               <div className="review-list">
                 {product.reviews.length > 0 ? (
                   product.reviews.map(review => (
                     <div key={review.id} className="review-item">
                       <div className="flex justify-between items-center mb-1">
                         <span className="review-author">{review.userName}</span>
                         <span className="review-date">{review.date}</span>
                       </div>
                       <StarRating rating={review.rating} size={12} />
                       <p className="review-text">{review.comment}</p>
                     </div>
                   ))
                 ) : (
                   <p className="text-stone-500 italic text-sm">No reviews yet.</p>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};