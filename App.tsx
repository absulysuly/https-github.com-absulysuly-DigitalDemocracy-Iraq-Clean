import React, { useEffect } from 'react';
import { useAppContext } from './contexts/AppContext';
import LoginPage from './components/LoginPage';
import MainLayout from './components/MainLayout';
import Header from './components/Header';

const App: React.FC = () => {
  const { isAuthenticated, language, user, logout, activeSection, activeTab } = useAppContext();

  useEffect(() => {
    const direction = language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language]);
  
  // Determine the theme class. The 'election' tab gets its own special theme.
  const themeClass = activeTab === 'election' ? 'theme-election' : `theme-${activeSection}`;


  return (
    <div className={`text-gray-100 min-h-screen ${themeClass}`}>
      {isAuthenticated && user ? (
        <>
          <Header user={user} onLogout={logout} />
          <MainLayout />
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default App;