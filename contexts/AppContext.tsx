import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Post, User, Candidate, Comment, Source } from '../types';
import { getCandidates } from '../services/electionApi';

// --- MOCK DATA (for features without a backend API) ---
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
  { id: 'fu9', name: 'Layla', avatarUrl: 'https://picsum.photos/id/1060/100/100' },
  { id: 'fu10', name: 'Khaled', avatarUrl: 'https://picsum.photos/id/1070/100/100' },
  { id: 'fu11', name: 'Fatima', avatarUrl: 'https://picsum.photos/id/1080/100/100' },
];

const initialPosts: Post[] = [
  { id: 'p1', author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' }, text: 'Just visited the new community center in the city square. Incredible to see our investment in public spaces bringing people together. Let\'s continue to build a more connected community for everyone! #CommunityFirst #PublicSpaces', imageUrl: 'https://picsum.photos/seed/p1/600/400', timestamp: new Date(Date.now() - 3600000).toISOString(), likes: 1200, comments: [ { id: 'c1-1', author: { id: 'u2', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/id/1011/100/100' }, text: 'This is a great initiative! So important for the community.', timestamp: new Date(Date.now() - 3000000).toISOString() }, { id: 'c1-2', author: { id: 'u3', name: 'Sam Wilson', avatarUrl: 'https://picsum.photos/id/1012/100/100' }, text: 'I was there yesterday, it looks fantastic.', timestamp: new Date(Date.now() - 2800000).toISOString() } ], shares: 45 },
  { id: 'p4', author: { id: 'c3', name: 'Anya Sharma', avatarUrl: 'https://picsum.photos/id/1045/100/100' }, text: 'Watch our latest address on the importance of green infrastructure and our plans for a more sustainable city. Every step we take today is a step towards a healthier planet tomorrow. #Sustainability #GreenFuture', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', timestamp: new Date(Date.now() - 5400000).toISOString(), likes: 1800, comments: [], shares: 98 },
  { id: 'p2', author: { id: 'c2', name: 'Marcus Thorne', avatarUrl: 'https://picsum.photos/id/1031/100/100' }, text: 'Small businesses are the backbone of our economy. Today, I outlined a new plan to cut red tape and provide tax incentives for local entrepreneurs. Let\'s empower innovation and create jobs. #SmallBusiness #Economy', timestamp: new Date(Date.now() - 7200000).toISOString(), likes: 980, comments: [], shares: 32 },
  { id: 'p3', author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' }, text: 'Productive discussion with environmental leaders today on our green energy initiatives. The future is renewable, and we must act now to protect our planet for future generations. 🌍 #GreenEnergy #Sustainability', timestamp: new Date(Date.now() - 86400000).toISOString(), likes: 2100, comments: [], shares: 150 },
];

const initialCommunityPosts: Post[] = [
    { id: 'cp1', author: { id: 'u2', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/id/1011/100/100' }, text: 'Excited for the upcoming election! It\'s great to have a platform where we can discuss the issues that matter to our community.', timestamp: new Date(Date.now() - 18000000).toISOString(), likes: 42, comments: [], shares: 5 },
    { id: 'cp2', author: { id: 'u3', name: 'Sam Wilson', avatarUrl: 'https://picsum.photos/id/1012/100/100' }, text: 'Does anyone have a good summary of the candidates\' stances on public transport? Trying to make an informed decision.', timestamp: new Date(Date.now() - 36000000).toISOString(), likes: 15, comments: [], shares: 2 },
];
// --- END MOCK DATA ---

interface AppContextType {
  currentUser: User;
  candidates: Candidate[];
  isLoadingCandidates: boolean;
  candidateError: string | null;
  featuredUsers: User[];
  posts: Post[];
  communityPosts: Post[];
  likedPosts: Set<string>;
  createPost: (postText: string, sources?: Source[]) => void;
  createCommunityPost: (postText: string, sources?: Source[]) => void;
  addComment: (postId: string, commentText: string) => void;
  toggleLike: (postId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [communityPosts, setCommunityPosts] = useState<Post[]>(initialCommunityPosts);
  const [likedPosts, setLikedPosts] = useState(new Set<string>());

  // State for live candidate data
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState<boolean>(true);
  const [candidateError, setCandidateError] = useState<string | null>(null);

  // Fetch candidates from the API on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoadingCandidates(true);
        setCandidateError(null);
        const fetchedCandidates = await getCandidates();
        setCandidates(fetchedCandidates);
      } catch (error) {
        console.error(error);
        setCandidateError('Failed to load candidate data. Please try again later.');
      } finally {
        setIsLoadingCandidates(false);
      }
    };

    fetchCandidates();
  }, []); // Empty dependency array ensures this runs only once.


  const createPost = useCallback((postText: string, sources?: Source[]) => {
    const newPost: Post = { id: `p${Date.now()}`, author: { id: 'c1', name: 'Elena Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/100/100' }, text: postText, timestamp: new Date().toISOString(), likes: 0, comments: [], shares: 0, sources };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);
  
  const createCommunityPost = useCallback((postText: string, sources?: Source[]) => {
    const newPost: Post = { id: `cp${Date.now()}`, author: mockUser, text: postText, timestamp: new Date().toISOString(), likes: 0, comments: [], shares: 0, sources };
    setCommunityPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  const addComment = useCallback((postId: string, commentText: string) => {
    const newComment: Comment = { id: `c${Date.now()}`, author: mockUser, text: commentText, timestamp: new Date().toISOString() };
    const updater = (postsToUpdate: Post[]) => postsToUpdate.map(post => post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post);
    setPosts(updater);
    setCommunityPosts(updater);
  }, []);

  const toggleLike = useCallback((postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    const isLiked = newLikedPosts.has(postId);

    const updateLikes = (p: Post) => {
        if (p.id === postId) {
            return { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 };
        }
        return p;
    };

    setPosts(prev => prev.map(updateLikes));
    setCommunityPosts(prev => prev.map(updateLikes));
    
    if (isLiked) {
        newLikedPosts.delete(postId);
    } else {
        newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  }, [likedPosts]);

  const value = {
    currentUser: mockUser,
    candidates,
    isLoadingCandidates,
    candidateError,
    featuredUsers: mockFeaturedUsers,
    posts,
    communityPosts,
    likedPosts,
    createPost,
    createCommunityPost,
    addComment,
    toggleLike,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};