import React, { useState } from 'react';
import { Post, Comment as CommentType } from '../types';
import { timeAgo } from '../utils/date';
import { HeartIcon, HeartIconSolid, CommentIcon, ShareIcon } from './IconComponents';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useAppContext } from '../contexts/AppContext';
import PostSources from './PostSources';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { user } = useAppContext();
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState<CommentType[]>(post.comments);
    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    const handleAddComment = (text: string) => {
        if (!user) return;
        const newComment: CommentType = {
            id: `c${Date.now()}`,
            author: user,
            text,
            timestamp: new Date().toISOString(),
        };
        setComments([...comments, newComment]);
    };

    return (
        <article className="p-4 border-b border-slate-700/50 hover:bg-slate-800/20 transition-colors duration-200">
            <div className="flex space-x-4">
                <img src={post.author.avatarUrl} alt={post.author.name} className="h-12 w-12 rounded-full flex-shrink-0" />
                <div className="flex-1">
                    <div className="flex items-baseline space-x-2">
                        <p className="font-bold text-white hover:underline cursor-pointer">{post.author.name}</p>
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
                         <button className="flex items-center space-x-2 hover:text-green-400 transition-colors group">
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
