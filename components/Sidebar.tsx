import React from 'react';
import { DocumentTextIcon, UserGroupIcon } from './IconComponents';

interface SidebarProps {
  stats: {
    totalPosts: number;
    totalMembers: number;
  };
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
        <div className="mr-4 text-blue-500 dark:text-blue-400">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
    </div>
);


const Sidebar: React.FC<SidebarProps> = ({ stats }) => {
  return (
    <div className="space-y-6 sticky top-24">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Platform Stats</h3>
        <div className="space-y-3">
           <StatCard 
             icon={<DocumentTextIcon className="w-8 h-8" />}
             label="Total Posts"
             value={stats.totalPosts.toLocaleString()}
           />
           <StatCard 
             icon={<UserGroupIcon className="w-8 h-8" />}
             label="Community Members"
             value={stats.totalMembers.toLocaleString()}
           />
        </div>
      </div>
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Trending Topics</h3>
        <ul className="space-y-2">
            {['#CommunityFirst', '#GreenEnergy', '#LocalEconomy', '#PublicSpaces'].map(tag => (
                <li key={tag}>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">{tag}</a>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{(Math.random() * 50).toFixed(0)}k posts this week</p>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;