import { Post, User, Comment, Candidate, TrendingTopic, Source } from '../types';

// MOCK DATA
const mockUsers: User[] = [
  { id: 'u1', name: 'Amara Al-Jamil', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
  { id: 'u2', name: 'Bao Khan', avatarUrl: 'https://picsum.photos/id/1025/100/100' },
  { id: 'u3', name: 'Carlos Diaz', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
  { id: 'u4', name: 'Daria Ivanova', avatarUrl: 'https://picsum.photos/id/237/100/100' },
  { id: 'u5', name: 'Elias Weber', avatarUrl: 'https://picsum.photos/id/305/100/100' },
  { id: 'u6', name: 'Fatima Zahra', avatarUrl: 'https://picsum.photos/id/433/100/100' },
  { id: 'u7', name: 'George Papadopoulos', avatarUrl: 'https://picsum.photos/id/10/100/100' },
];

const mockComments: Comment[] = [
  { id: 'c1', author: mockUsers[2], text: "Great point! We need to focus on this.", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'c2', author: mockUsers[3], text: "I completely agree. This is a crucial issue.", timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
];

const mockPosts: Post[] = [
  {
    id: 'p1',
    author: mockUsers[1],
    text: "Just attended the town hall on urban green spaces. It's inspiring to see so many people passionate about improving our city's environment. Let's keep this momentum going! #UrbanRenewal #GreenCity",
    imageUrl: 'https://picsum.photos/seed/greenspace/800/450',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 128,
    comments: mockComments,
    shares: 42,
    sources: [
        { title: 'City Council Meeting Minutes', uri: '#' },
        { title: 'Urban Planning Commission Report', uri: '#' }
    ]
  },
  {
    id: 'p2',
    author: mockUsers[4],
    text: "Early voting starts next week! Make sure you're registered and have a plan to vote. Your voice matters in shaping our community's future. #VoteEarly #CivicDuty",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 452,
    comments: [],
    shares: 112,
  },
  {
    id: 'p3',
    author: mockUsers[0],
    text: "Excited to share our new proposal for expanding local public transportation. Better transit means less traffic, cleaner air, and more accessible opportunities for everyone. Full details in the link below. #PublicTransit #CommunityFirst",
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    likes: 834,
    comments: [],
    shares: 231,
    sources: [
        { title: 'Official Transit Expansion Proposal PDF', uri: '#' }
    ]
  },
  {
    id: 'p4',
    author: mockUsers[5],
    text: "Debate night recap: Strong points were made on both sides regarding economic policy. It's crucial we continue this dialogue respectfully. What were your key takeaways? #EconomicDebate #DigitalDemocracy",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    likes: 310,
    comments: [],
    shares: 77,
  }
];

export const mockCandidates: Candidate[] = [
    { id: 'can1', name: 'Amara Al-Jamil', party: 'Visionary Party', avatarUrl: 'https://picsum.photos/id/1011/100/100', supporters: 125345, postCount: 234, governorate: 'Baghdad', gender: 'Female' },
    { id: 'can2', name: 'Bao Khan', party: 'Progress Alliance', avatarUrl: 'https://picsum.photos/id/1025/100/100', supporters: 110876, postCount: 198, governorate: 'Basra', gender: 'Male' },
    { id: 'can3', name: 'Carlos Diaz', party: 'Common Ground Coalition', avatarUrl: 'https://picsum.photos/id/1027/100/100', supporters: 98450, postCount: 155, governorate: 'Nineveh', gender: 'Male' },
    { id: 'can4', name: 'Daria Ivanova', party: 'Future Forward', avatarUrl: 'https://picsum.photos/id/237/100/100', supporters: 115670, postCount: 210, governorate: 'Erbil', gender: 'Female' },
];

export const mockTrendingTopics: TrendingTopic[] = [
    { category: 'National Politics', topic: '#HealthcareReform', postCount: 125000 },
    { category: 'Technology', topic: 'Digital Voting Security', postCount: 78000 },
    { category: 'Community', topic: '#SupportLocalBusiness', postCount: 45000 },
    { category: 'Environment', topic: 'Clean Energy Initiative', postCount: 92000 },
    { category: 'Economy', topic: 'Job Market Outlook', postCount: 110000 },
];


// MOCK API FUNCTIONS

const apiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPosts = async (page: number = 1, limit: number = 4): Promise<{ posts: Post[], hasMore: boolean }> => {
  await apiDelay(800);
  console.log(`Fetching page ${page}`);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = [...mockPosts, ...mockPosts, ...mockPosts].slice(start, end); // Just repeat for infinite scroll effect
  const hasMore = end < mockPosts.length * 3;
  return { posts: paginatedPosts, hasMore };
};

export const fetchCandidates = async (): Promise<Candidate[]> => {
    await apiDelay(500);
    return mockCandidates;
};

export const fetchTrendingTopics = async (): Promise<TrendingTopic[]> => {
    await apiDelay(600);
    return mockTrendingTopics;
};

export const fetchFeaturedUsers = async (): Promise<User[]> => {
    await apiDelay(400);
    return mockUsers.slice(0, 7); // Return first 7 for the stories bar
};
