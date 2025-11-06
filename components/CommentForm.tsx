
import React, { useState } from 'react';
import { User } from '../types';

interface CommentFormProps {
  user: User;
  onAddComment: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ user, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start space-x-3 mb-4">
      <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full" />
      <div className="flex-1">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
          placeholder="Write a comment..."
          aria-label="Write a comment"
        />
      </div>
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
