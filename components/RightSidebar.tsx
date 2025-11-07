import React, { useState } from 'react';
import { Candidate, TrendingTopic } from '../types';
import CountdownTimer from './CountdownTimer';
import CreatorSpotlight from './CreatorSpotlight';
import { SparklesIcon } from './IconComponents';

// --- TrendingTopics component defined locally to avoid creating new files ---
interface TrendingTopicsProps {
  topics: TrendingTopic[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <SparklesIcon className="w-5 h-5 text-teal-400" />
        <h3 className="text-lg font-bold text-white">What's Happening</h3>
      </div>
      <div className="space-y-4">
        {topics.map((item, index) => (
          <div key={index} className="group cursor-pointer">
            <p className="text-xs text-gray-400">{item.category} · Trending</p>
            <p className="font-bold text-white group-hover:underline">{item.topic}</p>
            <p className="text-xs text-gray-400">{item.postCount.toLocaleString()} posts</p>
          </div>
        ))}
         <a href="#" className="text-sm text-teal-400 hover:underline pt-2 block">Show more</a>
      </div>
    </div>
  );
};
// --- End of TrendigTopics component ---


interface RightSidebarProps {
  candidates: Candidate[];
  topics: TrendingTopic[];
  electionDate: string;
}

const FollowCard: React.FC<{ user: { name: string; party: string; avatarUrl: string } }> = ({ user }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <div className="flex items-center space-x-3">
            <button onClick={() => alert(`Viewing profile for ${user.name}. Full profile pages are coming soon!`)} className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 rounded-full">
                <img src={user.avatarUrl} alt={user.name} className="h-11 w-11 rounded-full" />
            </button>
            <div className="flex-1">
                <button onClick={() => alert(`Viewing profile for ${user.name}. Full profile pages are coming soon!`)} className="font-bold text-sm text-white hover:underline focus:outline-none">{user.name}</button>
                <p className="text-xs text-gray-400">{user.party}</p>
            </div>
            <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                    isFollowing 
                    ? 'bg-transparent border border-teal-500 text-teal-400' 
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    );
};


const RightSidebar: React.FC<RightSidebarProps> = ({ candidates, topics, electionDate }) => {
  return (
    <aside className="col-span-12 xl:col-span-3 hidden xl:block">
      <div className="sticky top-20 space-y-6">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <h3 className="text-lg font-bold text-white mb-4">Who to follow</h3>
          <div className="space-y-4">
            {candidates.slice(0, 3).map(candidate => (
              <FollowCard key={candidate.id} user={{name: candidate.name, party: candidate.party, avatarUrl: candidate.avatarUrl}} />
            ))}
          </div>
        </div>

        <TrendingTopics topics={topics} />
        
        <CountdownTimer targetDate={electionDate} />
        
        <CreatorSpotlight />

        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <h3 className="text-lg font-bold text-white mb-4">Platform Rules</h3>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
            <li>Be respectful to others.</li>
            <li>No hate speech or bullying.</li>
            <li>Encourage constructive debate.</li>
            <li>Fact-check before you share.</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;