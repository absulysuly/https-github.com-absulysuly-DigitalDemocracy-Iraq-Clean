import React from 'react';
import { GlobeIcon } from './IconComponents';

const MinoritiesSection: React.FC = () => {
  return (
    <div>
        <div className="p-4 border-b border-slate-700/50">
            <h2 className="text-xl font-bold text-white">Inclusive Voices</h2>
            <p className="text-sm text-gray-400">Celebrating diversity in our democracy.</p>
        </div>
        <div className="p-8 text-center text-gray-400">
            <GlobeIcon className="w-16 h-16 mx-auto text-[var(--color-accent)] opacity-50" />
            <p className="mt-4 text-lg">Content for this section is coming soon.</p>
            <p>This space will be dedicated to amplifying the voices and issues of minority communities.</p>
        </div>
    </div>
  );
};

export default MinoritiesSection;
