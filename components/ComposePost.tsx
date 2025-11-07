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
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim()) {
      // Simplification: assume if aiTopic was used, sources might exist.
      // A more robust solution might store sources in state.
      if (aiTopic) {
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
      } else {
        onCreatePost(postText.trim());
        setPostText('');
      }
    }
  };

  const handleGenerateText = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const { text } = await generatePostContent(aiTopic);
      setPostText(text);
      // We pass the sources along when the user submits the post
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-slate-700/50">
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-start space-x-4">
          <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full" />
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-2 border border-slate-600 rounded-lg bg-slate-700/50 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none transition-colors placeholder:text-gray-400"
            rows={3}
            placeholder={`What's on your mind?`}
          />
        </div>

        <div className="ml-16 mt-3 space-y-3">
          <div className="flex items-center gap-2">
             <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              className="w-full flex-1 px-3 py-1.5 border border-slate-600 rounded-full bg-slate-700/50 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors text-sm placeholder:text-gray-400"
              placeholder="AI Topic (Optional)"
            />
            <button
              type="button"
              onClick={handleGenerateText}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-teal-500/20 text-teal-400 disabled:opacity-50 disabled:cursor-not-allowed border border-teal-500/30"
            >
              <SparklesIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
            </button>
          </div>
           {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
       
        <div className="flex justify-between items-center mt-3 ml-16">
          <button type="button" className="p-2 rounded-full hover:bg-slate-700 text-gray-400">
            <ImageIcon className="w-6 h-6 text-green-500" />
          </button>
          <button
            type="submit"
            disabled={!postText.trim()}
            className="px-6 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 disabled:bg-teal-800/50 disabled:cursor-not-allowed transition-colors"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposePost;