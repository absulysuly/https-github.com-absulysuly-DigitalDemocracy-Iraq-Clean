import React from 'react';
import { LogoIcon } from './IconComponents';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <LogoIcon className="w-8 h-8 text-teal-400" />
            <h1 className="text-xl font-bold text-white hidden sm:block">Digital Democracy</h1>
          </div>
          
          <div className="flex-1 max-w-lg mx-4">
            <input 
              type="text" 
              placeholder="Search platform..."
              className="w-full px-4 py-2 border border-slate-600 rounded-full bg-slate-800/50 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full" />
            <div className="hidden md:block">
              <p className="font-semibold text-white">{user.name}</p>
            </div>
            <button 
              onClick={onLogout} 
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
