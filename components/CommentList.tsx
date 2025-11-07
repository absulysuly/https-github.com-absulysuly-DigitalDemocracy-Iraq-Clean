import React from 'react';
import { Comment } from '../types';
import { timeAgo } from '../utils/date';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="flex items-start space-x-3">
          <img src={comment.author.avatarUrl} alt={comment.author.name} className="h-9 w-9 rounded-full" />
          <div className="flex-1 bg-slate-700/50 rounded-xl p-3">
            <div className="flex items-baseline space-x-2">
              <p className="font-semibold text-sm text-white">{comment.author.name}</p>
              <p className="text-xs text-gray-400">{timeAgo(comment.timestamp)}</p>
            </div>
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
