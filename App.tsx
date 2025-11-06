
import React, { useState, useCallback } from 'react';
import { Post, User, Candidate, Comment } from './types';
import Header from './components/Header';
import ComposePost from './components/ComposePost';
import Feed from './components/Feed';
import CandidateCard from './components/CandidateCard';

const App: React.FC = () => {
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

  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleCreatePost = useCallback((postText: string, imageUrl?: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: mockUser,
      text: postText,
      imageUrl,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      shares: 0,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [mockUser]);

  const handleAddComment = useCallback((postId: string, commentText: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: mockUser,
      text: commentText,
      timestamp: new Date().toISOString(),
    };
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  }, [mockUser]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header user={mockUser} />
      <main className="container mx-auto max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <ComposePost user={mockUser} onCreatePost={handleCreatePost} />
          <Feed posts={posts} onAddComment={handleAddComment} currentUser={mockUser} />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 lg:sticky top-20 self-start">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Candidates</h2>
            {mockCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default App;
