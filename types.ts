
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
