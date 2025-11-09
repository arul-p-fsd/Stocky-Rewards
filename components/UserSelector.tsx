
import React from 'react';
import { User } from '../types';

interface UserSelectorProps {
  users: User[];
  selectedUserId: string;
  onUserChange: (userId: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ users, selectedUserId, onUserChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="user-select" className="block text-sm font-medium text-gray-400 mb-2">
        Select User
      </label>
      <select
        id="user-select"
        value={selectedUserId}
        onChange={(e) => onUserChange(e.target.value)}
        className="block w-full max-w-xs bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
