import { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: string;
}

export interface Source {
  title: string;
  uri: string;
}

export interface Post {
  id: string;
  author: User;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
  sources?: Source[];
  postType?: 'standard' | 'story' | 'vote_declaration';
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  avatarUrl: string;
  supporters?: number;
  postCount?: number;
  governorate?: string;
  gender?: 'Male' | 'Female' | 'Other';
}

export interface TrendingTopic {
  category: string;
  topic: string;
  postCount: number;
}

// Types for the new AI Creator Studio
export interface VisualSuggestion {
  description: string;
  type: 'image' | 'video';
}

export interface AICampaignPlan {
  postText: string;
  hashtags: string[];
  visuals: VisualSuggestion[];
}

export interface GeneratedAsset {
    type: 'image' | 'video';
    url: string; // base64 data URI for image, downloadable URL for video
    prompt: string;
}

// Type for the new Project Hub feature
export interface Project {
    id: string;
    name: string;
    description: string;
    icon: ReactNode;
    systemInstruction: string;
    samplePrompts: string[];
}