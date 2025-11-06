import React, { useState, useEffect, useCallback } from 'react';
import { generateCreatorSpotlight } from '../services/geminiService';
import { SparklesIcon } from './IconComponents';

interface Spotlight {
    quote: string;
    creatorHandle: string;
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
      setError('Failed to generate a new spotlight. Please try again.');
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
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>Generating inspirational quote...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (spotlight) {
      return (
        <blockquote className="text-center">
          <p className="text-2xl italic font-serif text-gray-800 dark:text-gray-200">
            "{spotlight.quote}"
          </p>
          <cite className="block mt-4 text-md font-semibold text-gray-600 dark:text-gray-400 not-italic">
            - {spotlight.creatorHandle}
          </cite>
        </blockquote>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div className="min-h-[160px] flex items-center justify-center">
        {renderContent()}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={fetchSpotlight}
          disabled={isLoading}
          className="flex items-center justify-center mx-auto space-x-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          <SparklesIcon className="w-5 h-5" />
          <span className="font-semibold">
            {isLoading ? 'Generating...' : 'New Spotlight'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreatorSpotlight;