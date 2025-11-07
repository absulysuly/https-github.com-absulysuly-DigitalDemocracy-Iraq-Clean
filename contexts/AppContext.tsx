import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Post, Candidate } from '../types';
import { getPosts, getCandidates, addPost as apiAddPost, getFeaturedUsers } from '../services/api';

interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  posts: Post[];
  candidates: Candidate[];
  featuredUsers: User[];
  login: (user: User) => void;
  logout: () => void;
  addPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [featuredUsers, setFeaturedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [postsData, candidatesData, featuredUsersData] = await Promise.all([
            getPosts(),
            getCandidates(),
            getFeaturedUsers(),
        ]);
        setPosts(postsData);
        setCandidates(candidatesData);
        setFeaturedUsers(featuredUsersData);
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

  const value = {
    isAuthenticated,
    user,
    posts,
    candidates,
    featuredUsers,
    login,
    logout,
    addPost,
    isLoading,
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
