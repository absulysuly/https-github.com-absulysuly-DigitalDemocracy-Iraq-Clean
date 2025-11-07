import { Post, User, Candidate, Comment, TrendingTopic } from '../types';
import { generateTrendingTopics } from './geminiService';

// Mock data generation functions
const createMockUser = (id: number, name: string, avatarId: number): User => ({
  id: `u${id}`,
  name,
  avatarUrl: `https://picsum.photos/id/${avatarId}/100/100`,
});

const createMockComment = (id: number, author: User, text: string, minutesAgo: number): Comment => ({
  id: `c${id}`,
  author,
  text,
  timestamp: new Date(Date.now() - minutesAgo * 60 * 1000).toISOString(),
});

// Mock Users
const user1 = createMockUser(1, 'Amara Al-Jamil', 1011);
const user2 = createMockUser(2, 'Ben Carter', 1025);
const user3 = createMockUser(3, 'Chen Wei', 1027);
const user4 = createMockUser(4, 'Diana Prince', 1028);

// Mock Posts
const mockPosts: Post[] = [
  {
    id: 'p1',
    author: user2,
    text: 'Excited to announce our new initiative to build more green spaces in the city center. A healthier community starts with a healthier environment! 🌳 #GreenCity #CommunityFirst',
    imageUrl: 'https://picsum.photos/seed/citypark/800/400',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    likes: 128,
    comments: [
      createMockComment(1, user3, 'This is fantastic news! Looking forward to it.', 5),
      createMockComment(2, user4, 'Great initiative! Where can we find more details?', 10),
    ],
    shares: 45,
    sources: [
        { title: "City Planning Commission - Green Space Initiative", uri: "#" },
        { title: "Environmental Impact Report - Urban Parks", uri: "#" },
    ]
  },
  {
    id: 'p2',
    author: user3,
    text: "Our new policy proposal aims to support local small businesses with tax incentives and streamlined regulations. Let's empower our local entrepreneurs to thrive!",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    likes: 256,
    comments: [
        createMockComment(3, user1, 'As a small business owner, I really appreciate this.', 120),
    ],
    shares: 88,
  },
  {
    id: 'p3',
    author: user4,
    text: "Just had a productive town hall meeting discussing the future of our public transportation system. Thanks to everyone who came out and shared their ideas!",
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    likes: 99,
    comments: [],
    shares: 21,
  },
];

const mockCandidates: Candidate[] = [
  { id: 'cand1', name: 'Elena Vance', party: 'Future Forward Party', avatarUrl: 'https://picsum.photos/id/237/100/100', supporters: 125321, postCount: 189, governorate: 'Capital Governorate', gender: 'Female' },
  { id: 'cand2', name: 'Marcus Thorne', party: 'Pioneer Alliance', avatarUrl: 'https://picsum.photos/id/238/100/100', supporters: 110456, postCount: 152, governorate: 'Northern Governorate', gender: 'Male' },
  { id: 'cand3', name: 'Sofia Chen', party: 'Unity Movement', avatarUrl: 'https://picsum.photos/id/239/100/100', supporters: 98765, postCount: 134, governorate: 'Southern Governorate', gender: 'Female' },
  { id: 'cand4', name: 'Jamal Al-Farsi', party: 'Progressive Coalition', avatarUrl: 'https://picsum.photos/id/240/100/100', supporters: 89123, postCount: 112, governorate: 'Muharraq Governorate', gender: 'Male' },
];

const mockFeaturedUsers: User[] = [
    createMockUser(10, 'Leo Valdez', 10),
    createMockUser(11, 'Piper McLean', 11),
    createMockUser(12, 'Frank Zhang', 12),
    createMockUser(13, 'Hazel Levesque', 13),
    createMockUser(14, 'Jason Grace', 14),
    createMockUser(15, 'Annabeth Chase', 15),
    createMockUser(16, 'Percy Jackson', 16),
];

const mockTrendingTopics: TrendingTopic[] = [
  { category: 'National Politics', topic: 'Healthcare Reform Bill', postCount: 18200 },
  { category: 'Local Community', topic: 'New Downtown Park Project', postCount: 9800 },
  { category: 'Technology', topic: 'Digital Voting Security', postCount: 12500 },
  { category: 'Environment', topic: 'Clean Energy Initiatives', postCount: 7600 },
  { category: 'Election 2024', topic: '#DebateNight', postCount: 25000 },
];

export const getPosts = async (): Promise<Post[]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
  return mockPosts;
};

export const getCandidates = async (): Promise<Candidate[]> => {
    await new Promise(res => setTimeout(res, 300));
    return mockCandidates;
};

export const getFeaturedUsers = async (): Promise<User[]> => {
    await new Promise(res => setTimeout(res, 200));
    return mockFeaturedUsers;
};

export const getTrendingTopics = async (): Promise<TrendingTopic[]> => {
    try {
        const topics = await generateTrendingTopics();
        // If Gemini returns an empty array, or for any reason it fails and returns empty, use mock data.
        if (topics && topics.length > 0) {
            return topics;
        }
        return mockTrendingTopics;
    } catch (error) {
        console.warn("Failed to fetch trending topics from Gemini, using mock data.", error);
        return mockTrendingTopics;
    }
};

export const addPost = async (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>): Promise<Post> => {
    await new Promise(res => setTimeout(res, 400));
    const newPost: Post = {
        id: `p${Date.now()}`,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        shares: 0,
        ...post,
    };
    mockPosts.unshift(newPost);
    return newPost;
}
