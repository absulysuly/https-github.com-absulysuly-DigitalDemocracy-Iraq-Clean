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
        <div className="flex items-center space-x-2 rounded-full bg-slate-800/80 p-1">
            <button onClick={() => handleSetLanguage('en')} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'en' ? 'bg-slate-600 text-white font-semibold' : 'text-gray-400 hover:bg-slate-700'}`}>
                🇬🇧 English
            </button>
            <button onClick={() => handleSetLanguage('ku')} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'ku' ? 'bg-slate-600 text-white font-semibold' : 'text-gray-400 hover:bg-slate-700'}`}>
                🇹🇯 کوردی
            </button>
            <button onClick={() => handleSetLanguage('ar')} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'ar' ? 'bg-slate-600 text-white font-semibold' : 'text-gray-400 hover:bg-slate-700'}`}>
                🇮🇶 العربية
            </button>
        </div>
    )
}

const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="px-4 py-2 flex justify-between items-center border-b border-slate-700/50 sticky top-16 z-30 bg-slate-900/80 backdrop-blur-sm">
      <div className="flex items-center space-x-1 rounded-full bg-slate-800/80 p-1">
        <button
          onClick={() => setActiveTab('social')}
          className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeTab === 'social' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          Social Interaction
        </button>
        <button
          onClick={() => setActiveTab('election')}
          className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeTab === 'election' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
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