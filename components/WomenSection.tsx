import React from 'react';
import { WomanIcon } from './IconComponents';

const WomenSection: React.FC = () => {
  return (
    <div>
        <div className="p-4 border-b border-slate-700/50">
            <h2 className="text-xl font-bold text-white">Women in Governance</h2>
            <p className="text-sm text-gray-400">Empowering voices, inspiring change.</p>
        </div>
        <div className="p-8 text-center text-gray-400">
            <WomanIcon className="w-16 h-16 mx-auto text-[var(--color-accent)] opacity-50" />
            <p className="mt-4 text-lg">Content for this section is coming soon.</p>
            <p>This area will be dedicated to highlighting the contributions and perspectives of women in civic life.</p>
        </div>
    </div>
  );
};

export default WomenSection;
