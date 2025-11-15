import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import CandidateCard from './CandidateCard';

const CandidatesSection: React.FC = () => {
  const { candidates, isLoading } = useAppContext();

  return (
    <div>
      <div className="p-4 border-b border-slate-700/50">
        <h2 className="text-xl font-bold text-white">Candidates</h2>
        <p className="text-sm text-gray-400">Browse all candidates running in the election.</p>
      </div>

      {isLoading && (
        <div className="text-center p-8 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent)] mx-auto"></div>
          <p className="mt-2">Loading candidates...</p>
        </div>
      )}

      {!isLoading && (
        <div className="divide-y divide-slate-700/50">
          {candidates.map(candidate => (
            <div key={candidate.id} className="p-2 hover:bg-slate-800/20">
                <CandidateCard candidate={candidate} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidatesSection;
