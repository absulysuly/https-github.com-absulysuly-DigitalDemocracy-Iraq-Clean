
import React, { useState } from 'react';
import { User } from '../types';
import { generatePostContent } from '../services/geminiService';
import { ImageIcon, SparklesIcon } from './IconComponents';

interface ComposePostProps {
  user: User;
  onCreatePost: (postText: string) => void;
}

const ComposePost: React.FC<ComposePostProps> = ({ user, onCreatePost }) => {
  const [postText, setPostText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim()) {
      onCreatePost(postText.trim());
      setPostText('');
    }
  };

  const handleGenerateText = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const prompt = `Write a positive and engaging social media post for a political campaign about improving local communities.`;
      const generatedText = await generatePostContent(prompt);
      setPostText(generatedText);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full" />
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-colors"
            rows={3}
            placeholder={`What's on your mind, ${user.name}?`}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2 ml-16">{error}</p>}
        <div className="flex justify-between items-center mt-3 ml-16">
          <div className="flex space-x-2">
            <button type="button" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
              <ImageIcon className="w-6 h-6 text-green-500" />
            </button>
             <button
              type="button"
              onClick={handleGenerateText}
              disabled={isGenerating}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SparklesIcon className="w-6 h-6" />
              <span className="text-sm font-semibold hidden sm:inline">{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
            </button>
          </div>
          <button
            type="submit"
            disabled={!postText.trim()}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposePost;
