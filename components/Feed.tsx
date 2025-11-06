
import React from 'react';
import { Post, User } from '../types';
import PostCard from './PostCard';

interface FeedProps {
  posts: Post[];
  onAddComment: (postId: string, commentText: string) => void;
  currentUser: User;
}

const Feed: React.FC<FeedProps> = ({ posts, onAddComment, currentUser }) => {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} onAddComment={onAddComment} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default Feed;
