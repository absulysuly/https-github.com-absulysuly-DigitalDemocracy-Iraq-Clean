
import React, { useState } from 'react';
import { Post, User } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, HeartIconSolid } from './IconComponents';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface PostCardProps {
  post: Post;
  onAddComment: (postId: string, commentText: string) => void;
  currentUser: User;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAddComment, currentUser }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = (commentText: string) => {
    onAddComment(post.id, commentText);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={post.author.avatarUrl} alt={post.author.name} className="h-12 w-12 rounded-full mr-4" />
          <div>
            <p className="font-bold text-gray-800 dark:text-white">{post.author.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{timeAgo(post.timestamp)}</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">{post.text}</p>
      </div>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-96 object-cover" />
      )}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
         <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <HeartIconSolid className="w-4 h-4 text-red-500" />
            <span>{likeCount.toLocaleString()}</span>
          </div>
          <button onClick={() => setShowComments(!showComments)} className="hover:underline">
            {post.comments.length} comments &middot; {post.shares} shares
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 flex">
        <button 
          onClick={handleLike}
          className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
        >
          {isLiked ? <HeartIconSolid className="w-6 h-6 text-red-500" /> : <HeartIcon className="w-6 h-6" />}
          <span className={`font-semibold ${isLiked ? 'text-red-500' : ''}`}>Like</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <CommentIcon className="w-6 h-6" />
          <span className="font-semibold">Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <ShareIcon className="w-6 h-6" />
          <span className="font-semibold">Share</span>
        </button>
      </div>
      {showComments && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          <CommentForm user={currentUser} onAddComment={handleAddComment} />
          <CommentList comments={post.comments} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
