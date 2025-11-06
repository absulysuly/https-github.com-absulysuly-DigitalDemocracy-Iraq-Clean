
import React from 'react';
import { User } from '../types';
import { LogoIcon } from './IconComponents';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-2">
            <LogoIcon className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Digital Democracy</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold hidden sm:block">{user.name}</span>
            <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full border-2 border-blue-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
