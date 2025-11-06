
import React, { useState } from 'react';
import { User, Source } from '../types';
import { generatePostContent } from '../services/geminiService';
import { ImageIcon, SparklesIcon } from './IconComponents';

interface ComposePostProps {
  user: User;
  onCreatePost: (postText: string, sources?: Source[]) => void;
}

const ComposePost: React.FC<ComposePostProps> = ({ user, onCreatePost }) => {
  const [postText, setPostText] = useState('');
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim()) {
      onCreatePost(postText.trim());
      setPostText('');
      setAiTopic('');
    }
  };

  const handleGenerateText = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const { text, sources } = await generatePostContent(aiTopic);
      setPostText(text);
      // We pass the sources along when the user submits the post
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim()) {
      // Regenerate to get sources if text was edited manually after generation
      // This is a simplification; a more robust solution might store sources in state
      generatePostContent(aiTopic).then(({ sources }) => {
          onCreatePost(postText.trim(), sources);
          setPostText('');
          setAiTopic('');
      }).catch(() => {
          // Post without sources if regeneration fails
          onCreatePost(postText.trim());
          setPostText('');
          setAiTopic('');
      });
    }
  };


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <form onSubmit={handleFormSubmit}>
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

        <div className="ml-16 mt-3 space-y-3">
          <div className="flex items-center gap-2">
             <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              className="w-full flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors text-sm"
              placeholder="AI Topic (Optional)"
            />
            <button
              type="button"
              onClick={handleGenerateText}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200 dark:border-blue-800"
            >
              <SparklesIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
            </button>
          </div>
           {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
       
        <div className="flex justify-between items-center mt-3 ml-16">
          <button type="button" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <ImageIcon className="w-6 h-6 text-green-500" />
          </button>
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
