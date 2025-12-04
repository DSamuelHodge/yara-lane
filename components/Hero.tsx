import React from 'react';
import { HERO_IMAGE } from '../constants';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* Background Image */}
      <img 
        src={HERO_IMAGE} 
        alt="Yara Lane Editorial" 
        className="hero-img"
      />
      
      {/* Overlay Gradient */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-container">
        <div className="space-y-4 max-w-2xl animate-slide-up">
          <h2 className="hero-subtitle">
            Est. 2024
          </h2>
          <h1 className="hero-title">
            Yara Lane
          </h1>
          <p className="hero-text">
            Curated beauty & timeless accessories for the modern soulful.
          </p>
        </div>
        
        <div className="animate-slide-up-delay mt-8">
          <Button 
            className="bg-stone-50 text-stone-900 hover:bg-stone-200 border-none"
            onClick={() => {
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Discover Essence
          </Button>
        </div>
      </div>
    </section>
  );
};