import React from 'react';
import { useAppContext } from './contexts/AppContext';
import LoginPage from './components/LoginPage';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <div className="bg-slate-900 text-gray-100 min-h-screen">
      {isAuthenticated ? <MainLayout /> : <LoginPage />}
    </div>
  );
};

export default App;
