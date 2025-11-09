
import React from 'react';

const Header: React.FC = () => (
  <header className="bg-gray-800 shadow-md">
    <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white tracking-wider">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline-block mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
        </svg>
        Stocky Rewards
      </h1>
      <span className="text-sm text-gray-400">Internal Dashboard</span>
    </div>
  </header>
);

export default Header;
