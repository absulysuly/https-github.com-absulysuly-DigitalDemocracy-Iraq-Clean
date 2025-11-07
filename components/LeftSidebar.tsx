import React from 'react';
import { User } from '../types';
import { HomeIcon, SettingsIcon } from './IconComponents';

interface LeftSidebarProps {
  user: User;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}> = ({ icon, label, isActive }) => (
  <a
    href="#"
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
      isActive
        ? 'bg-white/10 text-white'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ user }) => {
  return (
    <aside className="col-span-12 lg:col-span-2 hidden lg:block">
      <div className="sticky top-4">
        <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wider px-4 mb-4">
          Social Interaction
        </h2>
        <nav className="space-y-2">
          <NavLink
            icon={<HomeIcon className="w-6 h-6" />}
            label="Home"
            isActive={true}
          />
          <NavLink
            icon={<SettingsIcon className="w-6 h-6" />}
            label="Settings"
          />
        </nav>
      </div>
    </aside>
  );
};

export default LeftSidebar;
