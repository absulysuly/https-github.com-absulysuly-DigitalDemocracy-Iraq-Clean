import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Post, Candidate, TrendingTopic, Project, ActiveSection } from '../types';
import * as api from '../services/api';
import { BrainCircuitIcon, LinkIcon, SparklesIcon } from '../components/IconComponents';

export type Language = 'en' | 'ar' | 'ku';

// Fix: Define ActiveTab type to be used for content tabs.
export type ActiveTab = 'social' | 'election';

interface AppContextState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  
  // Data
  posts: Post[];
  candidates: Candidate[];
  trendingTopics: TrendingTopic[];
  featuredUsers: User[];
  
  // Feed State
  isLoading: boolean;
  hasMorePosts: boolean;
  isFetchingMore: boolean;
  loadMorePosts: () => void;
  addPost: (postData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => Promise<void>;

  // AI Creator / Project Hub
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;

  // Navigation State
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  // Fix: Add activeTab and setActiveTab to the context state to fix property access errors.
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Localization
  language: Language;
  setLanguage: (language: Language) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

const projectsData: Project[] = [
    {
        id: 'general-campaign-post',
        name: 'General Campaign Post',
        description: 'Create a standard post on a topic of your choice.',
        icon: <SparklesIcon className="w-8 h-8 text-teal-400" />,
        systemInstruction: `You are an AI assistant for a civic engagement platform called 'Digital Democracy'. Your tone must be neutral, informative, and encouraging of constructive dialogue. Avoid partisan language, speculation, or inflammatory statements. When generating a post based on a topic, rely on the provided search results to ensure accuracy.`,
        samplePrompts: [
            'A post encouraging young people to vote in local elections.',
            'Outline a plan for improving public parks and recreational areas.',
            'A message about the importance of digital literacy for all citizens.'
        ],
    },
    {
        id: 'policy-announcement',
        name: 'Policy Announcement',
        description: 'Draft a clear and concise policy announcement.',
        icon: <BrainCircuitIcon className="w-8 h-8 text-purple-400" />,
        systemInstruction: `You are an expert AI policy advisor for 'Digital Democracy'. Your task is to transform a user's policy idea into a clear, concise, and impactful social media announcement. The tone should be authoritative yet accessible. Focus on the benefits to the community and include a clear call to action.`,
        samplePrompts: [
            "Announce a new initiative to fund local arts and culture.",
            "Explain a new proposal for affordable housing development.",
            "Detail a plan to invest in renewable energy infrastructure."
        ],
    },
    {
        id: 'live-news-update',
        name: 'Live News Update',
        description: 'Generate a post by summarizing a news article URL.',
        icon: <LinkIcon className="w-8 h-8 text-blue-400" />,
        systemInstruction: `You are an AI journalist's assistant for 'Digital Democracy'. Your task is to analyze the content of a provided URL, accurately summarize the key information related to the user's topic, and draft a neutral, factual social media post. Always cite the provided URL as the source.`,
        samplePrompts: [
            'New voter registration numbers',
        ],
    }
];


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Auth
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  // Data
  const [posts, setPosts] = useState<Post[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [featuredUsers, setFeaturedUsers] = useState<User[]>([]);
  
  // Feed State
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Project Hub
  const [projects] = useState<Project[]>(projectsData);
  const [currentProject, setCurrentProject] = useState<Project | null>(projectsData[0]);

  // Navigation
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  // Fix: Add state for activeTab.
  const [activeTab, setActiveTab] = useState<ActiveTab>('social');

  // Language
  const [language, setLanguage] = useState<Language>('en');


  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const [postsData, candidatesData, topicsData, featuredUsersData] = await Promise.all([
          api.fetchPosts(1),
          api.fetchCandidates(),
          api.fetchTrendingTopics(),
          api.fetchFeaturedUsers(),
        ]);
        setPosts(postsData.posts);
        setHasMorePosts(postsData.hasMore);
        setCurrentPage(1);
        setCandidates(candidatesData);
        setTrendingTopics(topicsData);
        setFeaturedUsers(featuredUsersData);
      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const loadMorePosts = useCallback(async () => {
    if (isFetchingMore || !hasMorePosts) return;
    
    setIsFetchingMore(true);
    const nextPage = currentPage + 1;
    try {
      const { posts: newPosts, hasMore } = await api.fetchPosts(nextPage);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setHasMorePosts(hasMore);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Failed to fetch more posts", error);
    } finally {
      setIsFetchingMore(false);
    }
  }, [isFetchingMore, hasMorePosts, currentPage]);

  const addPost = async (postData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => {
    if (!user) throw new Error("User must be logged in to post.");
    
    const newPost: Post = {
        ...postData,
        id: `p${Date.now()}`,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        shares: 0,
        author: user,
        isNew: true,
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const contextValue: AppContextState = {
    isAuthenticated,
    user,
    login,
    logout,
    posts,
    candidates,
    trendingTopics,
    featuredUsers,
    isLoading,
    hasMorePosts,
    isFetchingMore,
    loadMorePosts,
    addPost,
    projects,
    currentProject,
    setCurrentProject,
    activeSection,
    setActiveSection,
    // Fix: Provide activeTab and setActiveTab in the context value.
    activeTab,
    setActiveTab,
    language,
    setLanguage
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};