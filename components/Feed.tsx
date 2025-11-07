import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import ComposePost from './ComposePost';
import PostCard from './PostCard';
import FeaturedUsers from './FeaturedUsers';

const Feed: React.FC = () => {
  const { posts, featuredUsers, isLoading, hasMorePosts, isFetchingMore, loadMorePosts } = useAppContext();

  return (
    <main>
      <div className="sticky top-16 z-30 bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-700/50">
        <h2 className="text-xl font-bold text-white">Home</h2>
      </div>
      
      <ComposePost />

      <div className="p-4 border-b border-slate-700/50">
        <FeaturedUsers users={featuredUsers} />
      </div>


      {isLoading && (
        <div className="text-center p-8 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto"></div>
          <p className="mt-2">Loading posts...</p>
        </div>
      )}
      
      {!isLoading && posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {!isLoading && hasMorePosts && (
        <div className="p-4 text-center border-t border-slate-700/50">
            <button
                onClick={loadMorePosts}
                disabled={isFetchingMore}
                className="px-6 py-2 bg-slate-800 text-teal-400 font-semibold rounded-full hover:bg-slate-700/50 disabled:cursor-wait disabled:opacity-70 transition-colors"
            >
                {isFetchingMore ? 'Loading...' : 'Load More'}
            </button>
        </div>
      )}
    </main>
  );
};

export default Feed;