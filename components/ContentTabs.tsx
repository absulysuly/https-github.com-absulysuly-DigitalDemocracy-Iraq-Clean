import React from 'react';
import { useAppContext, Language } from '../contexts/AppContext';

interface ContentTabsProps {
  activeTab: 'social' | 'election';
  setActiveTab: (tab: 'social' | 'election') => void;
}

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useAppContext();

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <div className="flex items-center space-x-2 rounded-full bg-slate-800/50 p-1 border border-white/10">
            <button onClick={() => handleSetLanguage('en')} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'en' ? 'bg-white text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-700/60'}`}>
                🇬🇧 English
            </button>
            <button onClick={() => handleSetLanguage('ku')} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'ku' ? 'bg-white text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-700/60'}`}>
                🇹🇯 کوردی
            </button>
            <button onClick={() => handleSetLanguage('ar')} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'ar' ? 'bg-white text-slate-900 font-bold' : 'text-gray-400 hover:bg-slate-700/60'}`}>
                🇮🇶 العربية
            </button>
        </div>
    )
}

const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, setActiveTab }) => {
  const socialActiveClasses = 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-lg shadow-[var(--color-accent-glow)] animate-pulse-custom';
  const electionActiveClasses = 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-lg shadow-[var(--color-accent-glow)] animate-pulse-custom';
  const inactiveClasses = 'text-gray-300 hover:bg-slate-700/60';

  return (
    <div className="px-4 py-2 flex justify-between items-center border-b border-white/10 sticky top-16 z-30 bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center space-x-1 rounded-full bg-slate-800/50 p-1 border border-white/10">
        <button
          onClick={() => setActiveTab('social')}
          className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${activeTab === 'social' ? socialActiveClasses : inactiveClasses}`}
        >
          Social Interaction
        </button>
        <button
          onClick={() => setActiveTab('election')}
          className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${activeTab === 'election' ? electionActiveClasses : inactiveClasses}`}
        >
          Election Management
        </button>
      </div>
      <div className="hidden sm:block">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default ContentTabs;