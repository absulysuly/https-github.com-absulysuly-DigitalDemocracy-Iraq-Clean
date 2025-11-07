import React, { useEffect } from 'react';
import { useAppContext } from './contexts/AppContext';
import LoginPage from './components/LoginPage';
import MainLayout from './components/MainLayout';
import Header from './components/Header';

const App: React.FC = () => {
  const { isAuthenticated, language, user, logout } = useAppContext();

  useEffect(() => {
    const direction = language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language]);


  return (
    <div className="text-gray-100 min-h-screen">
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