
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CollectionsGrid: React.FC = () => {
  const collections = [
    {
      id: 1,
      title: 'Hydrate',
      description: 'Deep moisture for thirsty skin.',
      image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/81c1ffe7-4ef4-4ad0-af93-20b8464eee2e_800w.jpg'
    },
    {
      id: 2,
      title: 'Purify',
      description: 'Gentle cleansing without stripping.',
      image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c09615d-a59e-4e70-a69c-f85d41f58008_800w.jpg'
    },
    {
      id: 3,
      title: 'Renew',
      description: 'Active botanical treatments.',
      image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/097cb637-6762-467b-a1d3-db0d530693f4_800w.jpg'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
       <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-fade-in">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">Curated Collections</h2>
          <p className="text-stone-500">Targeted routines for every skin concern.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-stone-600 transition-colors uppercase tracking-widest">
          View all <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
        </button>
      </div>

      <div className="collections-container">
        {collections.map((col) => (
          <div key={col.id} className="collection-card group">
            <img src={col.image} alt={col.title} className="collection-img" />
            <div className="collection-overlay" />
            <div className="collection-content">
              <div className="collection-info-box">
                <h3 className="collection-title">{col.title}</h3>
                <p className="collection-desc">{col.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
