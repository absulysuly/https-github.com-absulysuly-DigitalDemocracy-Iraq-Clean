import React, { useState, useEffect, useCallback } from 'react';
import { generateCreatorSpotlight } from '../services/geminiService';
import { RefreshIcon } from './IconComponents';

interface Spotlight {
    quote: string;
    author: string;
}

const CreatorSpotlight: React.FC = () => {
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpotlight = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateCreatorSpotlight();
      setSpotlight(data);
    } catch (err) {
      setError('Failed to generate a new quote. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpotlight();
  }, [fetchSpotlight]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse w-full">
          <div className="h-5 bg-slate-700 rounded w-11/12 mx-auto"></div>
          <div className="h-5 bg-slate-700 rounded w-3/4 mx-auto mt-3"></div>
          <div className="h-4 bg-slate-700 rounded w-1/3 mx-auto mt-6"></div>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (spotlight) {
      return (
        <blockquote className="text-center">
          <p className="text-xl italic font-serif text-teal-100 leading-relaxed">
            "{spotlight.quote}"
          </p>
          <cite className="block mt-4 text-md font-semibold text-teal-400 not-italic">
            — {spotlight.author}
          </cite>
        </blockquote>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 border-t-2 border-t-teal-500/50">
      <div className="min-h-[140px] flex items-center justify-center">
        {renderContent()}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={fetchSpotlight}
          disabled={isLoading}
          className="flex items-center justify-center mx-auto space-x-2 px-4 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-800/50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Generate new quote"
        >
          <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          {!isLoading && <span className="font-semibold">New Quote</span>}
        </button>
      </div>
    </div>
  );
};

export default CreatorSpotlight;