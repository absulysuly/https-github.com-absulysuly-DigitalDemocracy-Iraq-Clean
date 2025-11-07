import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import ComposePost from './ComposePost';
import PostCard from './PostCard';
import FeaturedUsers from './FeaturedUsers';

const Feed: React.FC = () => {
  const { posts, featuredUsers, isLoading } = useAppContext();

  return (
    <main className="col-span-12 lg:col-span-6 border-x border-slate-700/50">
      <div className="sticky top-16 z-30 bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-700/50">
        <h2 className="text-xl font-bold text-white">Home</h2>
      </div>
      
      <ComposePost />

      <div className="p-4 border-b border-slate-700/50">
        <FeaturedUsers users={featuredUsers} />
      </div>


      {isLoading && <div className="text-center p-8 text-gray-400">Loading posts...</div>}
      
      {!isLoading && posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Feed;
