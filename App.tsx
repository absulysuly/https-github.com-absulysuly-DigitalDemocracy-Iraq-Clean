import React, { useState, useCallback } from 'react';
import { Post, User, Candidate, Comment, Source } from './types';
import Header from './components/Header';
import ComposePost from './components/ComposePost';
import Feed from './components/Feed';
import CandidateCard from './components/CandidateCard';
import CountdownTimer from './components/CountdownTimer';
import CreatorSpotlight from './components/CreatorSpotlight';
import Sidebar from './components/Sidebar';
import { HomeIcon, UsersIcon, IdentificationIcon, SparklesIcon } from './components/IconComponents';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'social' | 'community' | 'candidates' | 'spotlight'>('social');

  const mockUser: User = {
    id: 'u1',
    name: 'Alex Doe',
    avatarUrl: 'https://picsum.photos/id/1005/100/100',
  };

  const mockCandidates: Candidate[] = [
    {
      id: 'c1',
      name: 'Elena Rodriguez',
      party: 'Progressive Alliance',
      avatarUrl: 'https://picsum.photos/id/1027/200/200',
      supporters: 125432,
      postCount: 88,
    },
    {
      id: 'c2',
      name: 'Marcus Thorne',
      party: 'Liberty Union',
      avatarUrl: 'https://picsum.photos/id/1031/200/200',
      supporters: 98765,
      postCount: 75,
    },
     {
      id: 'c3',
      name: 'Jian Li',
      party: 'Future Forward',
      avatarUrl: 'https://picsum.photos/id/1054/200/200',
      supporters: 81234,
      postCount: 62,
    },
  ];

  const initialPosts: Post[] = [
    {
      id: 'p1',
      author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
      text: 'Just visited the new community center in the city square. Incredible to see our investment in public spaces bringing people together. Let\'s continue to build a more connected community for everyone! #CommunityFirst #PublicSpaces',
      imageUrl: 'https://picsum.photos/seed/p1/600/400',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      likes: 1200,
      comments: [
        {
          id: 'c1-1',
          author: { id: 'u2', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
          text: 'This is a great initiative! So important for the community.',
          timestamp: new Date(Date.now() - 3000000).toISOString(),
        },
        {
          id: 'c1-2',
          author: { id: 'u3', name: 'Sam Wilson', avatarUrl: 'https://picsum.photos/id/1012/100/100' },
          text: 'I was there yesterday, it looks fantastic.',
          timestamp: new Date(Date.now() - 2800000).toISOString(),
        }
      ],
      shares: 45,
    },
    {
      id: 'p2',
      author: { id: 'c2', name: 'Marcus Thorne', avatarUrl: 'https://picsum.photos/id/1031/100/100' },
      text: 'Small businesses are the backbone of our economy. Today, I outlined a new plan to cut red tape and provide tax incentives for local entrepreneurs. Let\'s empower innovation and create jobs. #SmallBusiness #Economy',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      likes: 980,
      comments: [],
      shares: 32,
    },
    {
      id: 'p3',
      author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
      text: 'Productive discussion with environmental leaders today on our green energy initiatives. The future is renewable, and we must act now to protect our planet for future generations. 🌍 #GreenEnergy #Sustainability',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      likes: 2100,
      comments: [],
      shares: 150,
    },
  ];
  
  const initialCommunityPosts: Post[] = [
      {
        id: 'cp1',
        author: { id: 'u4', name: 'Community Member', avatarUrl: 'https://picsum.photos/id/1015/100/100' },
        text: 'Excited for the launch of this platform! It\'s great to have a new way to engage with our local candidates and discuss important issues. #CivicTech #DigitalDemocracy',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        likes: 150,
        comments: [],
        shares: 12,
      }
  ];

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [communityPosts, setCommunityPosts] = useState<Post[]>(initialCommunityPosts);

  const handleCreatePost = useCallback((postText: string, sources?: Source[]) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' }, // Simulating post by a candidate
      text: postText,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      shares: 0,
      sources,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  const handleCreateCommunityPost = useCallback((postText: string, sources?: Source[]) => {
    const newPost: Post = {
      id: `cp${Date.now()}`,
      author: mockUser,
      text: postText,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      shares: 0,
      sources,
    };
    setCommunityPosts(prevPosts => [newPost, ...prevPosts]);
  }, [mockUser]);

  const handleAddComment = useCallback((postId: string, commentText: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: mockUser,
      text: commentText,
      timestamp: new Date().toISOString(),
    };
    const updater = (posts: Post[]) => posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      );
    setPosts(updater);
    setCommunityPosts(updater);
  }, [mockUser]);

  const TabButton: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
  }> = ({ label, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 whitespace-nowrap py-2 px-4 rounded-full font-semibold text-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700/50'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
  
  const launchDate = new Date(new Date().getFullYear() + 1, 0, 1).toISOString();

  const totalPosts = posts.length + communityPosts.length;
  const totalMembers = 15234; // mock data

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header user={mockUser} />
      <main className="container mx-auto max-w-7xl p-4 lg:p-6">
        <CountdownTimer targetDate={launchDate} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Tab Navigation */}
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
              <nav className="flex flex-wrap items-center gap-2" aria-label="Tabs">
                <TabButton
                  label="Social Feed"
                  icon={<HomeIcon className="w-5 h-5" />}
                  isActive={activeTab === 'social'}
                  onClick={() => setActiveTab('social')}
                />
                <TabButton
                  label="Community"
                  icon={<UsersIcon className="w-5 h-5" />}
                  isActive={activeTab === 'community'}
                  onClick={() => setActiveTab('community')}
                />
                <TabButton
                  label="Candidates"
                  icon={<IdentificationIcon className="w-5 h-5" />}
                  isActive={activeTab === 'candidates'}
                  onClick={() => setActiveTab('candidates')}
                />
                 <TabButton
                  label="Spotlight"
                  icon={<SparklesIcon className="w-5 h-5" />}
                  isActive={activeTab === 'spotlight'}
                  onClick={() => setActiveTab('spotlight')}
                />
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'social' && (
                <>
                  <ComposePost user={mockUser} onCreatePost={handleCreatePost} />
                  <Feed posts={posts} onAddComment={handleAddComment} currentUser={mockUser} />
                </>
              )}
              {activeTab === 'community' && (
                 <>
                  <ComposePost user={mockUser} onCreatePost={handleCreateCommunityPost} />
                  <Feed posts={communityPosts} onAddComment={handleAddComment} currentUser={mockUser} />
                </>
              )}
              {activeTab === 'candidates' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Meet the Candidates</h2>
                  {mockCandidates.map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              )}
               {activeTab === 'spotlight' && (
                <CreatorSpotlight />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <Sidebar stats={{ totalPosts, totalMembers }} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;