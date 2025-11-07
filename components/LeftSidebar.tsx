import React from 'react';
import { Candidate, User } from '../types';
import { HomeIcon, UsersIcon, IdentificationIcon, SettingsIcon, ChartBarIcon } from './IconComponents';
import CandidateCard from './CandidateCard';
import { useAppContext } from '../contexts/AppContext';

interface LeftSidebarProps {
  user: User;
  candidates: Candidate[];
}

const NavLink: React.FC<{ icon: React.ReactNode, label: string, isActive?: boolean }> = ({ icon, label, isActive }) => (
  <a href="#" className={`flex items-center space-x-4 px-4 py-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-teal-500/20 text-teal-300 font-bold' : 'hover:bg-slate-700/50 text-gray-300'}`}>
    {icon}
    <span className="text-lg">{label}</span>
  </a>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ candidates }) => {
  const { currentProject } = useAppContext();

  return (
    <aside className="col-span-12 lg:col-span-3 hidden lg:block">
      <div className="sticky top-20 space-y-6">
        <nav className="space-y-2">
          <NavLink icon={<HomeIcon className="w-7 h-7" />} label="Home" isActive />
          <NavLink icon={<UsersIcon className="w-7 h-7" />} label="Community" />
          <NavLink icon={<IdentificationIcon className="w-7 h-7" />} label="Candidates" />
          
          {/* Conditional Link for Live Election Hub */}
          {currentProject?.id === 'live-election-hub' && (
              <a href="#" className="flex items-center space-x-4 px-4 py-3 rounded-full transition-colors duration-200 bg-teal-600/20 border border-teal-500/50 text-teal-300 font-bold animate-pulse hover:animate-none hover:bg-teal-500/30">
                  <ChartBarIcon className="w-7 h-7"/>
                  <span className="text-lg">Live Election Hub</span>
              </a>
          )}

          <NavLink icon={<SettingsIcon className="w-7 h-7" />} label="Settings" />
        </nav>

        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <h3 className="text-lg font-bold text-white mb-4">Top Candidates</h3>
          <div className="space-y-2">
            {candidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
