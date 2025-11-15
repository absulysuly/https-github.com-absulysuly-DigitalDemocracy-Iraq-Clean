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
        <div key={comment.id} className={`flex items-start space-x-3 ${comment.isNew ? 'animate-fade-in-down' : ''}`}>
          <button onClick={() => alert(`Viewing profile for ${comment.author.name}. Full profile pages are coming soon!`)} className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 rounded-full">
            <img src={comment.author.avatarUrl} alt={comment.author.name} className="h-9 w-9 rounded-full" />
          </button>
          <div className="flex-1 bg-slate-700/50 rounded-xl p-3">
            <div className="flex items-baseline space-x-2">
               <button onClick={() => alert(`Viewing profile for ${comment.author.name}. Full profile pages are coming soon!`)} className="font-semibold text-sm text-white hover:underline focus:outline-none">{comment.author.name}</button>
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