import React from 'react';
import { Leaf, Users, Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Text Hero */}
      <div className="about-hero">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
          The Essence of Being
        </h1>
        <p className="max-w-xl text-stone-500 font-light text-lg">
          We believe true luxury lies in the quiet moments of connection with oneself and nature.
        </p>
      </div>

      {/* Main Content */}
      <div className="about-section">
        <div className="about-text drop-cap">
          Yara Lane was born from a desire to slow down. In a world that constantly demands more—more speed, more products, more noise—we chose to cultivate less. Less clutter, but more meaning. Less ingredients, but more potency.
        </div>
        <div className="about-text">
          Our journey began in 2024, sourcing the finest botanicals and collaborating with artisans who still honor traditional methods. Every serum, scarf, and scent is designed to be a companion in your daily rituals, grounding you in the present moment.
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <img 
            src="https://picsum.photos/id/24/800/600" 
            alt="Botanical sourcing" 
            className="w-full h-64 object-cover rounded-sm"
          />
          <img 
            src="https://picsum.photos/id/250/800/600" 
            alt="Artisan craftsmanship" 
            className="w-full h-64 object-cover rounded-sm"
          />
        </div>

        <div className="about-text">
          We are committed to transparency. Our skincare is formulated without fillers, our accessories are crafted from natural fibers, and our footprint is kept minimal by choice. We invite you to breathe, explore, and find beauty in the essentials.
        </div>
      </div>

      {/* Values */}
      <div className="bg-stone-900 text-stone-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Leaf className="w-8 h-8 text-emerald-500" strokeWidth={1} />
            <h3 className="font-serif text-xl">Conscious Formulations</h3>
            <p className="text-stone-400 text-sm max-w-xs">
              Potent botanicals and safe synthetics. No harsh chemicals, ever.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Users className="w-8 h-8 text-stone-300" strokeWidth={1} />
            <h3 className="font-serif text-xl">Artisan Partnerships</h3>
            <p className="text-stone-400 text-sm max-w-xs">
              Supporting small-scale makers and traditional craftsmanship globally.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Globe className="w-8 h-8 text-blue-300" strokeWidth={1} />
            <h3 className="font-serif text-xl">Minimal Footprint</h3>
            <p className="text-stone-400 text-sm max-w-xs">
              Recyclable packaging and carbon-neutral shipping on every order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};