
import React, { useState } from 'react';
import { USERS, STOCK_SYMBOLS } from '../constants';
import { StockSymbol } from '../types';
import * as stockService from '../services/stockService';

interface RewardFormProps {
  onReward: () => void;
}

const RewardForm: React.FC<RewardFormProps> = ({ onReward }) => {
  const [userId, setUserId] = useState(USERS[0].id);
  const [symbol, setSymbol] = useState<StockSymbol>(STOCK_SYMBOLS[0]);
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      setMessage('Please enter a valid positive quantity.');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

    try {
      await stockService.rewardUser(userId, symbol, qty);
      setMessage(`Successfully rewarded ${qty} ${symbol} to ${USERS.find(u => u.id === userId)?.name}!`);
      setQuantity('');
      onReward();
    } catch (error) {
      setMessage('Failed to issue reward.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-white">Issue New Reward</h3>
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col space-y-4">
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-400">User</label>
          <select id="user" value={userId} onChange={(e) => setUserId(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white">
            {USERS.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-400">Stock Symbol</label>
          <select id="stock" value={symbol} onChange={(e) => setSymbol(e.target.value as StockSymbol)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white">
            {STOCK_SYMBOLS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-400">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
            placeholder="e.g., 1.25"
            step="0.000001"
          />
        </div>
        <div className="flex-grow"></div>
        <div className="mt-auto">
            <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isSubmitting ? 'Submitting...' : 'Grant Reward'}
            </button>
            {message && <p className="mt-2 text-sm text-center text-green-400">{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default RewardForm;
