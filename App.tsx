import React, { useEffect } from 'react';
import { useAppContext } from './contexts/AppContext';
import LoginPage from './components/LoginPage';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  const { isAuthenticated, language } = useAppContext();

  useEffect(() => {
    const direction = language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language]);


  return (
    <div className="bg-slate-900 text-gray-100 min-h-screen">
      {isAuthenticated ? <MainLayout /> : <LoginPage />}
    </div>
  );
};

export default App;