
import React from 'react';
import { Candidate } from '../types';
import { UserGroupIcon, DocumentTextIcon } from './IconComponents';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
      <img src={candidate.avatarUrl} alt={candidate.name} className="h-16 w-16 rounded-full" />
      <div className="flex-1">
        <p className="font-bold text-lg text-gray-800 dark:text-white">{candidate.name}</p>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{candidate.party}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
          <div className="flex items-center space-x-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{candidate.supporters.toLocaleString()} supporters</span>
          </div>
          <div className="flex items-center space-x-1">
            <DocumentTextIcon className="w-4 h-4" />
            <span>{candidate.postCount} posts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
