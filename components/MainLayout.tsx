import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Feed from './Feed';
import ContentTabs from './ContentTabs';
import ElectionManagementDashboard from './ElectionManagementDashboard';

const MainLayout: React.FC = () => {
  const { user, logout, candidates, trendingTopics } = useAppContext();
  const [activeTab, setActiveTab] = useState<'social' | 'election'>('social');

  // For CountdownTimer
  const electionDate = new Date(new Date().getFullYear() + 1, 10, 5).toISOString();

  if (!user) {
    // This should ideally not happen if routing is correct, but as a safeguard:
    return null; 
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-0 sm:gap-4 md:gap-8">
        <LeftSidebar />

        <main className="col-span-12 sm:col-span-11 xl:col-span-7 border-x border-slate-700/50 min-h-screen">
          {/* MainLayout doesn't render Header anymore as it is outside the grid for stickiness */}
          <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'social' ? <Feed /> : <ElectionManagementDashboard />}
        </main>
        
        <RightSidebar
          candidates={candidates}
          topics={trendingTopics}
          electionDate={electionDate}
        />
      </div>
    </div>
  );
};

export default MainLayout;
