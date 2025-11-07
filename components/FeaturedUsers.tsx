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
    <div className="mb-6">
      <div className="flex space-x-4 overflow-x-auto pb-3 -mx-4 px-4">
        {users.map((user) => (
          <div key={user.id} className="flex-shrink-0 text-center w-20">
            <button
              onClick={() => handleStoryClick(user.name)}
              className="relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 rounded-full group"
              aria-label={`View story from ${user.name}`}
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-16 w-16 rounded-full mx-auto border-2 border-teal-500 p-0.5 group-hover:scale-105 transition-transform duration-200"
              />
               <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></span>
            </button>
            <p className="text-xs text-white mt-2 truncate">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedUsers;