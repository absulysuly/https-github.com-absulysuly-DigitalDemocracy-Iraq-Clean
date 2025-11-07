import React from 'react';
import { DocumentTextIcon } from './IconComponents';

const VoterCenter: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 text-white">
      <div className="text-center bg-slate-800/50 p-12 rounded-lg border border-slate-700/50">
        <DocumentTextIcon className="w-16 h-16 mx-auto text-teal-400" />
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-teal-400">Voter Information Center</h2>
        <p className="mt-4 text-gray-400 max-w-lg mx-auto">
          Find your polling place, check your registration status, and learn about the candidates. This feature is coming soon to help you make your voice heard!
        </p>
      </div>
    </div>
  );
};

export default VoterCenter;
