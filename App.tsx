import React, { useState } from 'react';
import ComposePost from './components/ComposePost';
import Feed from './components/Feed';
import CandidateCard from './components/CandidateCard';
import CountdownTimer from './components/CountdownTimer';
import CreatorSpotlight from './components/CreatorSpotlight';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import FeaturedUsers from './components/FeaturedUsers';
import { useAppContext } from './contexts/AppContext';

const App: React.FC = () => {
  const [mainTab, setMainTab] = useState<'social' | 'election'>('social');
  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'candidates' | 'spotlight' | 'community'>('feed');

  const {
    currentUser,
    candidates,
    isLoadingCandidates,
    candidateError,
    featuredUsers,
    posts,
    communityPosts,
    createPost,
    createCommunityPost,
    addComment
  } = useAppContext();

  const MainTabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-center text-md font-bold transition-all duration-300 border-b-2 ${
        isActive ? 'text-white border-teal-400 shadow-[0_4px_15px_-5px_rgba(0,169,157,0.5)]' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
      }`}
    >
      {label}
    </button>
  );

  const SubTabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-3 py-1.5 text-sm font-medium relative whitespace-nowrap transition-colors duration-200 focus:outline-none ${ isActive ? 'text-teal-400' : 'text-gray-400 hover:text-white' }`}>
      {label}
      {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full shadow-[0_0_10px_0_rgba(0,169,157,0.7)]"></span>}
    </button>
  );

  const launchDate = new Date(new Date().getFullYear() + 1, 0, 1).toISOString();

  return (
    <div className="min-h-screen text-gray-200 font-sans">
      <div className="container mx-auto max-w-screen-2xl p-4">
        <div className="grid grid-cols-12 gap-6">
          <LeftSidebar user={currentUser} />
          <main className="col-span-12 lg:col-span-7 xl:col-span-6">
            <div className="p-4 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 mb-6">
                <div className='flex justify-between items-center mb-4'>
                     <h1 className="text-xl font-bold text-white">Digital Democracy</h1>
                     <div className="flex items-center gap-4 text-sm">
                        <a href="#" className="hover:text-teal-400">العربية</a>
                        <a href="#" className="hover:text-teal-400">کوردی</a>
                        <a href="#" className="hover:text-teal-400 font-bold text-white">English</a>
                    </div>
                </div>

                <div className="flex w-full mb-6">
                    <MainTabButton label="Social Interaction" isActive={mainTab === 'social'} onClick={() => setMainTab('social')} />
                    <MainTabButton label="Election Management" isActive={mainTab === 'election'} onClick={() => setMainTab('election')} />
                </div>

                {mainTab === 'social' && <CountdownTimer targetDate={launchDate} />}
            </div>
            
            {mainTab === 'social' && (
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
                <div className="flex items-center border-b border-slate-700/50 mb-4 overflow-x-auto">
                      <SubTabButton label="Feed" isActive={activeSubTab === 'feed'} onClick={() => setActiveSubTab('feed')} />
                      <SubTabButton label="Candidates" isActive={activeSubTab === 'candidates'} onClick={() => setActiveSubTab('candidates')} />
                      <SubTabButton label="Spotlight" isActive={activeSubTab === 'spotlight'} onClick={() => setActiveSubTab('spotlight')} />
                      <SubTabButton label="Community" isActive={activeSubTab === 'community'} onClick={() => setActiveSubTab('community')} />
                </div>
                  
                  <FeaturedUsers users={featuredUsers} />

                  <div>
                    {activeSubTab === 'feed' && (
                      <>
                        <ComposePost user={currentUser} onCreatePost={createPost} />
                        <Feed posts={posts} onAddComment={addComment} currentUser={currentUser} />
                      </>
                    )}
                    {activeSubTab === 'candidates' && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white px-2">Meet the Candidates</h2>
                        {isLoadingCandidates && <p className="text-center text-gray-400 py-4">Loading candidates...</p>}
                        {candidateError && <p className="text-center text-red-500 py-4">{candidateError}</p>}
                        {!isLoadingCandidates && !candidateError && candidates.map(candidate => <CandidateCard key={candidate.id} candidate={candidate} />)}
                        {!isLoadingCandidates && !candidateError && candidates.length === 0 && <p className="text-center text-gray-400 py-4">No candidates found.</p>}
                      </div>
                    )}
                    {activeSubTab === 'spotlight' && <CreatorSpotlight />}
                    {activeSubTab === 'community' && (
                      <>
                        <ComposePost user={currentUser} onCreatePost={createCommunityPost} />
                        <Feed posts={communityPosts} onAddComment={addComment} currentUser={currentUser} />
                      </>
                    )}
                  </div>
              </div>
            )}

            {mainTab === 'election' && (
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Election Management</h2>
                    <p className="text-gray-300">
                        This section is under construction and will be the future home of the powerful data tools from the "missinggold" project.
                    </p>
                    <p className="text-gray-400 mt-2">
                        Features for managing election data, tracking results, analyzing demographics, and viewing civic facility information will be available here soon.
                    </p>
                </div>
            )}
          </main>
          <RightSidebar candidates={candidates} />
        </div>
      </div>
    </div>
  );
};

export default App;