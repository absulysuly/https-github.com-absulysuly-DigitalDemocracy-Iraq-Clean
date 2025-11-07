import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { LogoIcon } from './IconComponents';
import { User } from '../types';

const LoginPage: React.FC = () => {
  const { login } = useAppContext();
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials.
    // Here, we'll just log in a mock user.
    const mockUser: User = {
      id: 'u1',
      name: 'Amara Al-Jamil',
      avatarUrl: 'https://picsum.photos/id/1011/100/100',
    };
    login(mockUser);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800/50 rounded-xl shadow-2xl border border-slate-700/50">
        <div className="text-center">
            <LogoIcon className="w-16 h-16 mx-auto text-teal-400" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Digital Democracy
            </h1>
            <p className="mt-2 text-gray-400">
                A platform for civic engagement.
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700/50 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Username (use 'user')"
              />
            </div>
            <div>
              <label htmlFor="password-input" className="sr-only">Password</label>
              <input
                id="password-input"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700/50 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Password (use 'password')"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
