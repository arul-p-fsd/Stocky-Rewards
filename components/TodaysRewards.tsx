
import React from 'react';
import { Reward } from '../types';

interface TodaysRewardsProps {
  rewards: Reward[];
}

const TodaysRewards: React.FC<TodaysRewardsProps> = ({ rewards }) => {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-white">Today's Rewards</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {rewards.length > 0 ? rewards.map(reward => (
          <div key={reward.id} className="bg-gray-700/50 p-3 rounded-md flex justify-between items-center">
            <div>
              <p className="font-bold text-white">{reward.symbol}</p>
              <p className="text-sm text-gray-400">
                {new Date(reward.rewardedAt).toLocaleTimeString()}
              </p>
            </div>
            <p className="font-semibold text-green-400 text-lg">
              + {reward.quantity.toFixed(4)} shares
            </p>
          </div>
        )) : (
            <div className="text-center py-8 text-gray-500">No rewards issued today.</div>
        )}
      </div>
    </div>
  );
};

export default TodaysRewards;
