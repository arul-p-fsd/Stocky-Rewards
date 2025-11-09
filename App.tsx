
import React, { useState, useCallback } from 'react';
import { USERS } from './constants';
import Header from './components/Header';
import UserSelector from './components/UserSelector';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>(USERS[0].id);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleUserChange = useCallback((userId: string) => {
    setSelectedUserId(userId);
  }, []);

  const handleDataRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <UserSelector
          users={USERS}
          selectedUserId={selectedUserId}
          onUserChange={handleUserChange}
        />
        <Dashboard 
          key={`${selectedUserId}-${refreshKey}`} 
          userId={selectedUserId}
          onDataRefresh={handleDataRefresh}
        />
      </main>
    </div>
  );
};

export default App;
