import React, { useState } from 'react';
import { Post, Comment } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { timeAgo } from '../utils/date';
import { CommentIcon, HeartIcon, HeartIconSolid, ShareIcon } from './IconComponents';
import PostSources from './PostSources';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAppContext();
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prevLikes => (isLiked ? prevLikes - 1 : prevLikes + 1));
  };

  const handleAddComment = (text: string) => {
    if (!user) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: user,
      text,
      timestamp: new Date().toISOString(),
    };
    setComments(prevComments => [newComment, ...prevComments]);
  };

  return (
    <article className="p-4 border-b border-slate-700/50 hover:bg-slate-800/20 transition-colors duration-200">
            <div className="flex space-x-4">
                <button onClick={() => alert(`Viewing profile for ${post.author.name}. Full profile pages are coming soon!`)} className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 rounded-full">
                    <img src={post.author.avatarUrl} alt={post.author.name} className="h-12 w-12 rounded-full" />
                </button>
                <div className="flex-1">
                    <div className="flex items-baseline space-x-2">
                        <button onClick={() => alert(`Viewing profile for ${post.author.name}. Full profile pages are coming soon!`)} className="font-bold text-white hover:underline cursor-pointer focus:outline-none">{post.author.name}</button>
                        <p className="text-sm text-gray-400">· {timeAgo(post.timestamp)}</p>
                    </div>

                    <p className="text-gray-200 mt-1 whitespace-pre-wrap">{post.text}</p>
                    
                    {post.imageUrl && (
                        <div className="mt-3 rounded-2xl overflow-hidden w-full border border-slate-700/50">
                            <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {post.videoUrl && (
                        <div className="mt-3 rounded-2xl overflow-hidden w-full border border-slate-700/50">
                            <video controls src={post.videoUrl} className="w-full h-full bg-black" />
                        </div>
                    )}

                    {post.sources && post.sources.length > 0 && <PostSources sources={post.sources} />}

                    <div className="flex justify-between items-center mt-4 text-gray-400 max-w-sm">
                        <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-teal-400 transition-colors group">
                             <div className="p-2 group-hover:bg-teal-500/10 rounded-full">
                                <CommentIcon className="w-5 h-5" />
                            </div>
                            <span className="text-sm">{comments.length}</span>
                        </button>
                        <button onClick={handleLike} className="flex items-center space-x-2 hover:text-red-500 transition-colors group">
                           <div className="p-2 group-hover:bg-red-500/10 rounded-full">
                            {isLiked ? (
                                <HeartIconSolid className="w-5 h-5 text-red-500" />
                            ) : (
                                <HeartIcon className="w-5 h-5" />
                            )}
                            </div>
                            <span className={`text-sm ${isLiked ? 'text-red-500' : ''}`}>{likes.toLocaleString()}</span>
                        </button>
                         <button onClick={() => alert('Sharing post... (Full sharing functionality coming soon!)')} className="flex items-center space-x-2 hover:text-green-400 transition-colors group">
                             <div className="p-2 group-hover:bg-green-500/10 rounded-full">
                                <ShareIcon className="w-5 h-5" />
                            </div>
                            <span className="text-sm">{post.shares.toLocaleString()}</span>
                        </button>
                    </div>

                    {showComments && user && (
                        <div className="mt-4">
                            <CommentForm user={user} onAddComment={handleAddComment} />
                            <CommentList comments={comments} />
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default PostCard;
