import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import Feed from './Feed';
import RightSidebar from './RightSidebar';

const MainLayout: React.FC = () => {
  const { user, logout, candidates, trendingTopics } = useAppContext();

  // This should not happen if MainLayout is rendered, but it's a good type guard.
  if (!user) {
    return null; 
  }

  // A future date for the election countdown
  const electionDate = new Date(new Date().getFullYear() + 1, 10, 5).toISOString();


  return (
    <>
      <Header user={user} onLogout={logout} />
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-12 gap-8">
            <LeftSidebar user={user} candidates={candidates} />

            <div className="col-span-12 lg:col-span-6">
                <Feed />
            </div>
            
            <RightSidebar 
                candidates={candidates}
                topics={trendingTopics}
                electionDate={electionDate}
            />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
