import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
  BookmarkIcon,
  CogIcon,
  LogoIcon,
  WomanIcon,
  GlobeIcon
} from './IconComponents';
import { User, ActiveSection } from '../types';

interface NavItemProps {
  id: ActiveSection;
  icon: React.ReactNode;
  label: string;
}

const LeftSidebar: React.FC = () => {
    const { user, activeSection, setActiveSection, logout } = useAppContext();

    const navItems: NavItemProps[] = [
      { id: 'home', label: 'Home', icon: <HomeIcon className="w-7 h-7" /> },
      { id: 'women', label: 'Women', icon: <WomanIcon className="w-7 h-7" /> },
      { id: 'candidates', label: 'Candidates', icon: <UsersIcon className="w-7 h-7" /> },
      { id: 'minorities', label: 'Minorities', icon: <GlobeIcon className="w-7 h-7" /> },
    ];
    
    const secondaryNavItems = [
      { label: 'Notifications', icon: <BellIcon className="w-7 h-7" /> },
      { label: 'Bookmarks', icon: <BookmarkIcon className="w-7 h-7" /> },
      { label: 'Settings', icon: <CogIcon className="w-7 h-7" /> },
    ]

  return (
    <aside className="col-span-1 xl:col-span-2 hidden sm:flex flex-col justify-between h-screen sticky top-0 py-4">
        <div>
            <div className="p-3">
                <LogoIcon className="w-8 h-8 text-[var(--color-accent)]" />
            </div>
            <nav className="mt-4 space-y-2">
            {navItems.map(item => {
                 const isActive = activeSection === item.id;
                 const activeClasses = 'bg-slate-800/80 text-white font-bold';
                 const inactiveClasses = 'text-gray-400 hover:bg-slate-800/50 hover:text-white';
                return (
                    <button key={item.id} onClick={() => setActiveSection(item.id)} className={`group-hover-shimmer flex items-center space-x-4 px-4 py-3 rounded-full transition-colors duration-200 w-full text-left ${isActive ? activeClasses : inactiveClasses}`}>
                        <div className="shimmer-target">{item.icon}</div>
                        <span className="text-xl hidden xl:inline">{item.label}</span>
                    </button>
                )
            })}
             <div className="pt-4 mt-4 border-t border-slate-700/50">
                 {secondaryNavItems.map(item => (
                      <button key={item.label} className="group-hover-shimmer flex items-center space-x-4 px-4 py-3 rounded-full transition-colors duration-200 w-full text-left text-gray-400 hover:bg-slate-800/50 hover:text-white">
                        <div className="shimmer-target">{item.icon}</div>
                        <span className="text-xl hidden xl:inline">{item.label}</span>
                    </button>
                 ))}
             </div>
            </nav>
        </div>
        
        {user && (
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
        )}
    </aside>
  );
};

export default LeftSidebar;