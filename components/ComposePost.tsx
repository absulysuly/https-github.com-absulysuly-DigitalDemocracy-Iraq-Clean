import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { generatePostContent } from '../services/geminiService';
import { ImageIcon, SparklesIcon } from './IconComponents';
import { Source } from '../types';

const ComposePost: React.FC = () => {
  const { user, addPost } = useAppContext();
  const [postText, setPostText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [sources, setSources] = useState<Source[]>([]);

  const handleGeneratePost = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setSources([]);
    try {
      const { text, sources: generatedSources } = await generatePostContent(topic);
      setPostText(text);
      setSources(generatedSources);
    } catch (error) {
      console.error("Failed to generate post:", error);
      alert("AI post generation failed. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() || !user) return;
    
    try {
        await addPost({ author: user, text: postText, sources });
        setPostText('');
        setTopic('');
        setSources([]);
    } catch(error) {
        // Handle post submission error
        alert("Failed to create post. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <div className="p-4 border-b border-slate-700/50">
      <div className="flex space-x-4">
        <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full bg-transparent text-lg text-white placeholder-gray-500 focus:outline-none resize-none"
              rows={3}
              placeholder="What's happening?"
            />

            <div className="my-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <input 
                    type="text"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="Or, let AI generate a post based on a topic..."
                    className="flex-1 bg-transparent focus:outline-none placeholder:text-gray-500"
                    disabled={isGenerating}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleGeneratePost(); }}}
                />
                <button
                    type="button"
                    onClick={handleGeneratePost}
                    disabled={isGenerating || !topic.trim()}
                    className="px-4 py-1.5 text-sm font-semibold bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:bg-teal-800/50 disabled:cursor-not-allowed transition-colors"
                >
                    {isGenerating ? 'Generating...' : 'Generate'}
                </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2 text-teal-400">
                <button type="button" className="p-2 hover:bg-teal-500/10 rounded-full transition-colors">
                  <ImageIcon className="w-6 h-6" />
                </button>
                {/* Add other icons for polls, gifs, etc. */}
              </div>
              <button
                type="submit"
                disabled={!postText.trim() || isGenerating}
                className="px-6 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 disabled:bg-teal-800/50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComposePost;
