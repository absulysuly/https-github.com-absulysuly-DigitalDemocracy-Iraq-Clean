import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Feed from './Feed';
import ContentTabs from './ContentTabs';
import ElectionManagementDashboard from './ElectionManagementDashboard';
import BottomNav from './BottomNav';
import CandidatesSection from './CandidatesSection';
import WomenSection from './WomenSection';
import MinoritiesSection from './MinoritiesSection';

const MainLayout: React.FC = () => {
  const { candidates, trendingTopics, activeSection, activeTab, setActiveTab } = useAppContext();
  
  const electionDate = new Date(new Date().getFullYear() + 1, 10, 5).toISOString();

  const renderSocialContent = () => {
    switch (activeSection) {
      case 'home':
        return <Feed />;
      case 'candidates':
        return <CandidatesSection />;
      case 'women':
        return <WomenSection />;
      case 'minorities':
        return <MinoritiesSection />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="container mx-auto pb-20 sm:pb-0">
      <div className="grid grid-cols-12 gap-0 sm:gap-4 md:gap-8">
        <LeftSidebar />

        <main className="col-span-12 sm:col-span-11 xl:col-span-7 border-x border-white/10 min-h-screen">
          <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'social' ? renderSocialContent() : <ElectionManagementDashboard />}
        </main>
        
        <RightSidebar
          candidates={candidates}
          topics={trendingTopics}
          electionDate={electionDate}
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default MainLayout;