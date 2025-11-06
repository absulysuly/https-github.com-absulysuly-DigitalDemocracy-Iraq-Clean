
import React from 'react';
import { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
}

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

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="flex items-start space-x-3">
          <img src={comment.author.avatarUrl} alt={comment.author.name} className="h-9 w-9 rounded-full" />
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-3">
            <div className="flex items-baseline space-x-2">
              <p className="font-semibold text-sm text-gray-800 dark:text-white">{comment.author.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(comment.timestamp)}</p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
