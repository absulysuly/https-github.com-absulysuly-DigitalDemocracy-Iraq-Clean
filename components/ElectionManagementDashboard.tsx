import React from 'react';
import CountdownTimer from './CountdownTimer';

const ElectionManagementDashboard: React.FC = () => {
    const electionDate = new Date(new Date().getFullYear() + 1, 10, 5).toISOString();

  return (
    <div className="p-4 sm:p-8 text-white bg-gradient-to-b from-slate-900 to-[#0c1a2e]">
        <div className="mb-8">
            <CountdownTimer targetDate={electionDate} />
        </div>
      <div className="text-center bg-slate-800/30 p-12 rounded-lg border border-cyan-500/20 shadow-xl shadow-cyan-500/10">
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300">Election Management Dashboard</h2>
        <p className="mt-4 text-gray-400 max-w-lg mx-auto">
          This powerful suite of tools for campaign analysis, voter outreach, and integrity monitoring is coming soon. Stay tuned for updates!
        </p>
         <div className="mt-8">
            <button className="px-6 py-3 bg-cyan-600 text-white font-bold rounded-full hover:bg-cyan-700 transition-colors shadow-md shadow-cyan-500/20">
                Request Early Access
            </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionManagementDashboard;