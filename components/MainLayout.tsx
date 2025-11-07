import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import Feed from './Feed';
import CountdownTimer from './CountdownTimer';
import CreatorSpotlight from './CreatorSpotlight';

const MainLayout: React.FC = () => {
  const { user, logout, candidates } = useAppContext();

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

            <div className="col-span-12 lg:col-span-6 xl:col-span-6">
                <Feed />
            </div>
            
            <aside className="col-span-12 xl:col-span-3 hidden xl:block">
                <div className="sticky top-20 space-y-6">
                    <CountdownTimer targetDate={electionDate} />
                    <CreatorSpotlight />
                </div>
            </aside>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
