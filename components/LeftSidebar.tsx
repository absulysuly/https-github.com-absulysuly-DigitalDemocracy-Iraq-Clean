import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import {
  HomeIcon,
  HashtagIcon,
  UsersIcon,
  BellIcon,
  BookmarkIcon,
  DocumentTextIcon,
  CogIcon,
  LogoIcon
} from './IconComponents';
import { User } from '../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive }) => {
  const activeClasses = 'bg-slate-800 text-white font-bold';
  const inactiveClasses = 'text-gray-400 hover:bg-slate-800/50 hover:text-white';

  return (
    <button className={`flex items-center space-x-4 px-4 py-3 rounded-full transition-colors duration-200 w-full text-left ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className="text-xl hidden xl:inline">{label}</span>
    </button>
  );
};

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
    const { logout } = useAppContext();
    return (
        <div className="mt-6">
            <button 
                onClick={logout} 
                className="w-full flex items-center space-x-3 p-3 rounded-full hover:bg-slate-800/50 transition-colors"
            >
                <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full" />
                <div className="flex-1 text-left hidden xl:block">
                    <p className="font-bold text-white leading-tight">{user.name}</p>
                    <p className="text-sm text-gray-400 leading-tight">@{user.name.replace(/\s+/g, '').toLowerCase()}</p>
                </div>
            </button>
        </div>
    );
}

const LeftSidebar: React.FC = () => {
    const { user } = useAppContext();

  return (
    <aside className="col-span-12 sm:col-span-1 xl:col-span-2">
      <div className="sticky top-0 h-screen flex flex-col justify-between py-4">
        <div>
            <div className="p-3">
                <LogoIcon className="w-8 h-8 text-teal-400" />
            </div>
            <nav className="mt-4 space-y-2">
            <NavItem icon={<HomeIcon className="w-7 h-7" />} label="Home" isActive />
            <NavItem icon={<HashtagIcon className="w-7 h-7" />} label="Explore" />
            <NavItem icon={<UsersIcon className="w-7 h-7" />} label="Candidates" />
            <NavItem icon={<BellIcon className="w-7 h-7" />} label="Notifications" />
            <NavItem icon={<BookmarkIcon className="w-7 h-7" />} label="Bookmarks" />
            <NavItem icon={<DocumentTextIcon className="w-7 h-7" />} label="Voter Center" />
            <NavItem icon={<CogIcon className="w-7 h-7" />} label="Settings" />
            </nav>
        </div>
        
        {user && <UserProfile user={user} />}
      </div>
    </aside>
  );
};

export default LeftSidebar;