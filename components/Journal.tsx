import React from 'react';
import { JOURNAL_POSTS } from '../constants';
import { ArrowRight } from 'lucide-react';

export const Journal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 animate-fade-in">
      <div className="flex flex-col items-center mb-16 space-y-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900">
          The Journal
        </h2>
        <p className="text-stone-500 max-w-md">
          Stories on wellness, design, and living with intention.
        </p>
        <div className="w-16 h-px bg-stone-300 mt-4" />
      </div>

      <div className="journal-grid">
        {JOURNAL_POSTS.map((post) => (
          <article key={post.id} className="journal-card group">
            <div className="journal-img-wrapper">
              <img 
                src={post.image} 
                alt={post.title} 
                className="journal-img"
              />
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="journal-meta flex items-center justify-between">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              
              <h3 className="journal-title group-hover:underline decoration-stone-300 underline-offset-4 decoration-1">
                {post.title}
              </h3>
              
              <p className="journal-excerpt">
                {post.excerpt}
              </p>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center text-xs font-bold tracking-widest text-stone-900 uppercase">
                Read Story <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};