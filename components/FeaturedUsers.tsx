import React from 'react';
import { User } from '../types';

interface FeaturedUsersProps {
  users: User[];
}

const FeaturedUsers: React.FC<FeaturedUsersProps> = ({ users }) => {

  const handleStoryClick = (userName: string) => {
    alert(`Viewing story from ${userName}... (Full story viewer feature is coming soon!)`);
  };

  return (
    <div className="mb-2">
      <div className="flex space-x-4 overflow-x-auto pb-3 -mx-4 px-4">
        {users.map((user) => (
          <div key={user.id} className="flex-shrink-0 text-center w-20 group">
            <button
              onClick={() => handleStoryClick(user.name)}
              className="relative p-1 bg-gradient-to-tr from-purple-500 to-teal-400 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-rotate-6"
              aria-label={`View story from ${user.name}`}
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-16 w-16 rounded-full border-4 border-slate-800"
              />
            </button>
            <p className="text-xs text-white mt-2 truncate transition-colors group-hover:text-teal-300">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedUsers;