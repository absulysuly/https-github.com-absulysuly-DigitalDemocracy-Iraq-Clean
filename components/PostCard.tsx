import React, { useState } from 'react';
import { Post, User } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, HeartIconSolid } from './IconComponents';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PostSources from './PostSources';
import { useAppContext } from '../contexts/AppContext';
import { timeAgo } from '../utils/date';

interface PostCardProps {
  post: Post;
  onAddComment: (postId: string, commentText: string) => void;
  currentUser: User;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAddComment, currentUser }) => {
  const { likedPosts, toggleLike } = useAppContext();
  const [showComments, setShowComments] = useState(false);

  const isLiked = likedPosts.has(post.id);

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleAddComment = (commentText: string) => {
    onAddComment(post.id, commentText);
  };
  
  return (
    <div className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={post.author.avatarUrl} alt={post.author.name} className="h-12 w-12 rounded-full mr-4" />
          <div>
            <p className="font-bold text-white">{post.author.name}</p>
            <p className="text-sm text-gray-400">{timeAgo(post.timestamp)}</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.text}</p>
        {post.sources && post.sources.length > 0 && <PostSources sources={post.sources} />}
      </div>
      
      {post.videoUrl && (
        <div className="w-full bg-black aspect-video">
            <video controls className="w-full h-full object-contain">
                <source src={post.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
      )}
      
      {post.imageUrl && !post.videoUrl && (
        <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-96 object-cover" />
      )}

      <div className="border-t border-slate-700/50 px-4 py-2">
         <div className="flex justify-between items-center text-gray-400">
          <div className="flex items-center space-x-1">
            <HeartIconSolid className="w-4 h-4 text-red-500" />
            <span>{post.likes.toLocaleString()}</span>
          </div>
          <button onClick={() => setShowComments(!showComments)} className="hover:underline text-sm">
            {post.comments.length} comments &middot; {post.shares} shares
          </button>
        </div>
      </div>
      <div className="border-t border-slate-700/50 flex bg-slate-900/50">
        <button 
          onClick={handleLike}
          className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-300 hover:bg-slate-700/50 transition-colors duration-200 focus:outline-none"
          aria-pressed={isLiked}
        >
          {isLiked ? <HeartIconSolid className="w-6 h-6 text-red-500" /> : <HeartIcon className="w-6 h-6" />}
          <span className={`font-semibold ${isLiked ? 'text-red-500' : ''}`}>Like</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-300 hover:bg-slate-700/50 transition-colors duration-200"
        >
          <CommentIcon className="w-6 h-6" />
          <span className="font-semibold">Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-300 hover:bg-slate-700/50 transition-colors duration-200">
          <ShareIcon className="w-6 h-6" />
          <span className="font-semibold">Share</span>
        </button>
      </div>
      {showComments && (
        <div className="p-4 bg-slate-900/50 border-t border-slate-700/50">
          <CommentForm user={currentUser} onAddComment={handleAddComment} />
          <CommentList comments={post.comments} />
        </div>
      )}
    </div>
  );
};

export default PostCard;