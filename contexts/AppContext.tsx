import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Post, Candidate, TrendingTopic, Project } from '../types';
import { getPosts, getCandidates, addPost as apiAddPost, getFeaturedUsers, getTrendingTopics } from '../services/api';
import { GlobeAltIcon, MegaphoneIcon, ChartBarIcon, NewspaperIcon } from '../components/IconComponents';

// --- Define Language Type ---
export type Language = 'en' | 'ar' | 'ku';

// --- Define Projects ---
const PROJECTS: Project[] = [
    {
        id: 'general-civic-engagement',
        name: 'General Engagement',
        description: 'Create posts for general civic topics.',
        icon: <GlobeAltIcon className="w-6 h-6 text-sky-400" />,
        systemInstruction: `You are an AI assistant for a civic engagement platform called 'Digital Democracy'. Your tone must be neutral, informative, and encouraging of constructive dialogue. Avoid partisan language, speculation, or inflammatory statements.`,
        samplePrompts: [
            'Highlight the importance of local elections.',
            'Create a post about community volunteering.',
            'Explain the role of a city council member.'
        ]
    },
    {
        id: 'live-news-update',
        name: 'Live News Update',
        description: 'Generate a post from a website URL.',
        icon: <NewspaperIcon className="w-6 h-6 text-green-400" />,
        systemInstruction: `You are an AI journalist's assistant for 'Digital Democracy'. Your task is to analyze the content of a provided URL, accurately summarize the key information related to the user's topic, and draft a neutral, factual social media post. Always cite the provided URL as the source.`,
        samplePrompts: [
            'Summarize the latest election results from this page.',
            'Announce new voter registration deadlines from this article.',
            'Create a post about the main points of this policy update.'
        ]
    },
    {
        id: 'candidate-town-hall',
        name: 'Candidate Town Hall',
        description: 'Generate content for a candidate event.',
        icon: <MegaphoneIcon className="w-6 h-6 text-amber-400" />,
        systemInstruction: `You are an AI assistant helping to promote and facilitate a 'Candidate Town Hall' on the 'Digital Democracy' platform. Your goal is to generate excitement, inform the public, and formulate insightful, non-leading questions for the candidate. Be neutral and focus on policy and community impact.`,
        samplePrompts: [
            'Announce an upcoming town hall with [Candidate Name].',
            'Generate 5 questions for a candidate about environmental policy.',
            'Write a post summarizing the key takeaways from a recent town hall.'
        ]
    },
    {
        id: 'live-election-hub',
        name: 'Live Election Hub',
        description: 'Focus on election day participation.',
        icon: <ChartBarIcon className="w-6 h-6 text-teal-400" />,
        systemInstruction: `You are an AI assistant for the 'Live Election Hub' on the 'Digital Democracy' platform. Your primary goal is to generate energetic, encouraging, and non-partisan content that motivates users to vote and share their participation. Focus on unity, civic pride, and the collective power of voting.`,
        samplePrompts: [
            'Write an inspiring "Get Out the Vote" message.',
            'Create a post celebrating high voter turnout.',
            'Generate a thank you message for poll workers.'
        ]
    }
];

interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  posts: Post[];
  candidates: Candidate[];
  featuredUsers: User[];
  trendingTopics: TrendingTopic[];
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  login: (user: User) => void;
  logout: () => void;
  addPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => Promise<void>;
  isLoading: boolean;
  loadMorePosts: () => void;
  hasMorePosts: boolean;
  isFetchingMore: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [featuredUsers, setFeaturedUsers] = useState<User[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState<Project | null>(PROJECTS[0]);
  const [language, setLanguage] = useState<Language>('en');

  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [postsResult, candidatesData, featuredUsersData, trendingTopicsData] = await Promise.all([
            getPosts(1), // Fetch page 1
            getCandidates(),
            getFeaturedUsers(),
            getTrendingTopics(),
        ]);
        setPosts(postsResult.posts);
        setHasMorePosts(postsResult.hasMore);
        setPage(1);
        setCandidates(candidatesData);
        setFeaturedUsers(featuredUsersData);
        setTrendingTopics(trendingTopicsData);
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const addPost = useCallback(async (postData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => {
    try {
      const newPost = await apiAddPost(postData);
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (error) {
      console.error("Failed to add post", error);
      throw error;
    }
  }, []);
  
  const loadMorePosts = useCallback(async () => {
    if (isFetchingMore || !hasMorePosts) return;

    setIsFetchingMore(true);
    try {
        const nextPage = page + 1;
        const result = await getPosts(nextPage);
        setPosts(prev => [...prev, ...result.posts]);
        setHasMorePosts(result.hasMore);
        setPage(nextPage);
    } catch (error) {
        console.error("Failed to load more posts", error);
    } finally {
        setIsFetchingMore(false);
    }
  }, [page, hasMorePosts, isFetchingMore]);


  const setCurrentProjectHandler = (project: Project) => {
    setCurrentProject(project);
  };

  const value = {
    isAuthenticated,
    user,
    posts,
    candidates,
    featuredUsers,
    trendingTopics,
    projects: PROJECTS,
    currentProject,
    setCurrentProject: setCurrentProjectHandler,
    language,
    setLanguage,
    login,
    logout,
    addPost,
    isLoading,
    loadMorePosts,
    hasMorePosts,
    isFetchingMore,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};