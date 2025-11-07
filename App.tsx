import React, { useState, useCallback } from 'react';
import { Post, User, Candidate, Comment, Source } from './types';
import ComposePost from './components/ComposePost';
import Feed from './components/Feed';
import CandidateCard from './components/CandidateCard';
import CountdownTimer from './components/CountdownTimer';
import CreatorSpotlight from './components/CreatorSpotlight';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import FeaturedUsers from './components/FeaturedUsers';
import { SparklesIcon, UsersIcon, IdentificationIcon, HomeIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'candidates' | 'spotlight' | 'community'>('feed');
  const [activeMainTab, setActiveMainTab] = useState<'social' | 'election'>('social');

  const mockUser: User = {
    id: 'u1',
    name: 'Alex Doe',
    avatarUrl: 'https://picsum.photos/id/1005/100/100',
  };
  
  const mockFeaturedUsers: User[] = [
    { id: 'fu1', name: 'Hassan', avatarUrl: 'https://picsum.photos/id/1012/100/100' },
    { id: 'fu2', name: 'Noor', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
    { id: 'fu3', name: 'Ayman', avatarUrl: 'https://picsum.photos/id/1025/100/100' },
    { id: 'fu4', name: 'Nour', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
    { id: 'fu5', name: 'Mustafa', avatarUrl: 'https://picsum.photos/id/1031/100/100' },
    { id: 'fu6', name: 'Mohammed', avatarUrl: 'https://picsum.photos/id/1040/100/100' },
    { id: 'fu7', name: 'Yusuf', avatarUrl: 'https://picsum.photos/id/1045/100/100' },
    { id: 'fu8', name: 'Ahmed', avatarUrl: 'https://picsum.photos/id/1050/100/100' },
  ];

  const mockCandidates: Candidate[] = [
    { id: 'c1', name: 'Elena Rodriguez', party: 'Progressive Alliance', avatarUrl: 'https://picsum.photos/id/1027/200/200', supporters: 125432, postCount: 88 },
    { id: 'c2', name: 'Marcus Thorne', party: 'Liberty Union', avatarUrl: 'https://picsum.photos/id/1031/200/200', supporters: 98765, postCount: 75 },
    { id: 'c3', name: 'Jian Li', party: 'Future Forward', avatarUrl: 'https://picsum.photos/id/1054/200/200', supporters: 81234, postCount: 62 },
  ];
  
  const initialPosts: Post[] = [
    { id: 'p1', author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' }, text: 'Just visited the new community center in the city square. Incredible to see our investment in public spaces bringing people together. Let\'s continue to build a more connected community for everyone! #CommunityFirst #PublicSpaces', imageUrl: 'https://picsum.photos/seed/p1/600/400', timestamp: new Date(Date.now() - 3600000).toISOString(), likes: 1200, comments: [ { id: 'c1-1', author: { id: 'u2', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/id/1011/100/100' }, text: 'This is a great initiative! So important for the community.', timestamp: new Date(Date.now() - 3000000).toISOString() }, { id: 'c1-2', author: { id: 'u3', name: 'Sam Wilson', avatarUrl: 'https://picsum.photos/id/1012/100/100' }, text: 'I was there yesterday, it looks fantastic.', timestamp: new Date(Date.now() - 2800000).toISOString() } ], shares: 45 },
    { id: 'p2', author: { id: 'c2', name: 'Marcus Thorne', avatarUrl: 'https://picsum.photos/id/1031/100/100' }, text: 'Small businesses are the backbone of our economy. Today, I outlined a new plan to cut red tape and provide tax incentives for local entrepreneurs. Let\'s empower innovation and create jobs. #SmallBusiness #Economy', timestamp: new Date(Date.now() - 7200000).toISOString(), likes: 980, comments: [], shares: 32 },
    { id: 'p3', author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' }, text: 'Productive discussion with environmental leaders today on our green energy initiatives. The future is renewable, and we must act now to protect our planet for future generations. 🌍 #GreenEnergy #Sustainability', timestamp: new Date(Date.now() - 86400000).toISOString(), likes: 2100, comments: [], shares: 150 },
  ];

  const initialCommunityPosts: Post[] = [
      { id: 'cp1', author: { id: 'u2', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/id/1011/100/100' }, text: 'Excited for the upcoming election! It\'s great to have a platform where we can discuss the issues that matter to our community.', timestamp: new Date(Date.now() - 18000000).toISOString(), likes: 42, comments: [], shares: 5 },
      { id: 'cp2', author: { id: 'u3', name: 'Sam Wilson', avatarUrl: 'https://picsum.photos/id/1012/100/100' }, text: 'Does anyone have a good summary of the candidates\' stances on public transport? Trying to make an informed decision.', timestamp: new Date(Date.now() - 36000000).toISOString(), likes: 15, comments: [], shares: 2 },
  ]

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [communityPosts, setCommunityPosts] = useState<Post[]>(initialCommunityPosts);

  const handleCreatePost = useCallback((postText: string, sources?: Source[]) => {
    const newPost: Post = { id: `p${Date.now()}`, author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' }, text: postText, timestamp: new Date().toISOString(), likes: 0, comments: [], shares: 0, sources };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);
  
  const handleCreateCommunityPost = useCallback((postText: string, sources?: Source[]) => {
    const newPost: Post = { id: `cp${Date.now()}`, author: mockUser, text: postText, timestamp: new Date().toISOString(), likes: 0, comments: [], shares: 0, sources };
    setCommunityPosts(prevPosts => [newPost, ...prevPosts]);
  }, [mockUser]);

  const handleAddComment = useCallback((postId: string, commentText: string) => {
    const newComment: Comment = { id: `c${Date.now()}`, author: mockUser, text: commentText, timestamp: new Date().toISOString() };
    const updater = (postsToUpdate: Post[]) => postsToUpdate.map(post => post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post);
    setPosts(updater);
    setCommunityPosts(updater);
  }, [mockUser]);
  
  const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none ${ isActive ? 'bg-teal-500 text-white shadow-[0_4px_14px_0_rgba(0,169,157,0.3)]' : 'text-gray-400 hover:text-white' }`}>
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
          <LeftSidebar user={mockUser} />
          <main className="col-span-12 lg:col-span-7 xl:col-span-6">
            <div className="p-4 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 mb-6">
                <div className='flex justify-between items-center mb-4'>
                    <div className="flex items-center gap-2">
                        <TabButton label="Social Interaction" isActive={activeMainTab === 'social'} onClick={() => setActiveMainTab('social')} />
                        <TabButton label="Election Management" isActive={activeMainTab === 'election'} onClick={() => setActiveMainTab('election')} />
                    </div>
                     <div className="flex items-center gap-4 text-sm">
                        <a href="#" className="hover:text-teal-400">العربية</a>
                        <a href="#" className="hover:text-teal-400">کوردی</a>
                        <a href="#" className="hover:text-teal-400 font-bold text-white">English</a>
                    </div>
                </div>
                <CountdownTimer targetDate={launchDate} />
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
               <div className="flex items-center border-b border-slate-700/50 mb-4 overflow-x-auto">
                    <SubTabButton label="Feed" isActive={activeTab === 'feed'} onClick={() => setActiveTab('feed')} />
                    <SubTabButton label="Candidates" isActive={activeTab === 'candidates'} onClick={() => setActiveTab('candidates')} />
                    <SubTabButton label="Spotlight" isActive={activeTab === 'spotlight'} onClick={() => setActiveTab('spotlight')} />
                    <SubTabButton label="Community" isActive={activeTab === 'community'} onClick={() => setActiveTab('community')} />
               </div>
                
                <FeaturedUsers users={mockFeaturedUsers} />

                <div>
                  {activeTab === 'feed' && (
                    <>
                      <ComposePost user={mockUser} onCreatePost={handleCreatePost} />
                      <Feed posts={posts} onAddComment={handleAddComment} currentUser={mockUser} />
                    </>
                  )}
                  {activeTab === 'candidates' && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-white px-2">Meet the Candidates</h2>
                      {mockCandidates.map(candidate => <CandidateCard key={candidate.id} candidate={candidate} />)}
                    </div>
                  )}
                  {activeTab === 'spotlight' && <CreatorSpotlight />}
                  {activeTab === 'community' && (
                    <>
                      <ComposePost user={mockUser} onCreatePost={handleCreateCommunityPost} />
                      <Feed posts={communityPosts} onAddComment={handleAddComment} currentUser={mockUser} />
                    </>
                  )}
                </div>
            </div>
          </main>
          <RightSidebar candidates={mockCandidates} />
        </div>
      </div>
    </div>
  );
};

export default App;