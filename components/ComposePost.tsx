import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Source, Post } from '../types';
import { ImageIcon, SparklesIcon } from './IconComponents';
import AICreatorModal from './AICreatorModal';

const ComposePost: React.FC = () => {
  const { user, addPost } = useAppContext();
  const [postText, setPostText] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() || !user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const postData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'> = {
        author: user,
        text: postText,
        sources,
        imageUrl: generatedImageUrl || undefined,
        videoUrl: generatedVideoUrl || undefined,
      };
      await addPost(postData);
      
      // Reset form
      setPostText('');
      setSources([]);
      setGeneratedImageUrl(null);
      setGeneratedVideoUrl(null);

    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAiCreateComplete = (content: { text: string; imageUrl?: string; videoUrl?: string; sources?: Source[] }) => {
    setPostText(content.text);
    setGeneratedImageUrl(content.imageUrl || null);
    setGeneratedVideoUrl(content.videoUrl || null);
    setSources(content.sources || []);
    setIsModalOpen(false);
  };
  
  if (!user) return null;

  return (
    <>
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex space-x-4">
          <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full bg-transparent text-lg text-white placeholder-gray-500 focus:outline-none resize-none"
                rows={postText.length > 80 ? 5 : 3}
                placeholder="What's happening?"
              />

              {(generatedImageUrl || generatedVideoUrl) && (
                <div className="my-3 rounded-2xl overflow-hidden w-full max-h-96 border border-slate-700/50 flex items-center justify-center bg-slate-800/50">
                  {generatedImageUrl && (
                    <img src={generatedImageUrl} alt="AI generated content" className="w-full h-full object-cover" />
                  )}
                  {generatedVideoUrl && (
                    <video controls src={generatedVideoUrl} className="w-full h-full bg-black" />
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2 text-teal-400">
                  <button type="button" className="p-2 hover:bg-teal-500/10 rounded-full transition-colors" aria-label="Add image">
                    <ImageIcon className="w-6 h-6" />
                  </button>
                   <button 
                    type="button" 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-teal-600/10 border border-teal-600/50 text-teal-300 rounded-full hover:bg-teal-500/20 transition-colors"
                    aria-label="Create with AI"
                  >
                    <SparklesIcon className="w-5 h-5" />
                    <span className="font-semibold text-sm">Create with AI</span>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!postText.trim() || isSubmitting}
                  className="px-6 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AICreatorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onComplete={handleAiCreateComplete}
        />
      )}
    </>
  );
};

export default ComposePost;
