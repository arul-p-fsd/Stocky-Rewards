
import React from 'react';
import { Stats } from '../types';

interface StatsCardsProps {
  stats: Stats | null;
}

const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
const formatGainLoss = (value: number) => {
    const formatted = formatCurrency(Math.abs(value));
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
}


const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  if (!stats) return null;

  const totalGainLoss = stats.currentPortfolioValue - stats.totalPortfolioCost;
  const gainLossPercent = stats.totalPortfolioCost > 0 ? (totalGainLoss / stats.totalPortfolioCost) * 100 : 0;
  const gainLossColor = totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-400 text-sm font-medium">Current Portfolio Value</h3>
        <p className="text-3xl font-semibold text-white mt-2">{formatCurrency(stats.currentPortfolioValue)}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-400 text-sm font-medium">Total Gain / Loss</h3>
        <p className={`text-3xl font-semibold mt-2 ${gainLossColor}`}>{formatGainLoss(totalGainLoss)}</p>
        <span className={`text-sm font-medium ${gainLossColor}`}>
          {gainLossPercent.toFixed(2)}%
        </span>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-400 text-sm font-medium">Shares Rewarded Today</h3>
        <div className="text-xl font-semibold text-white mt-2">
            {Object.keys(stats.totalSharesToday).length > 0 ? (
                Object.entries(stats.totalSharesToday).map(([symbol, qty]) => (
                    <div key={symbol} className="text-sm flex justify-between">
                        <span>{symbol}:</span>
                        <span>{qty.toFixed(4)}</span>
                    </div>
                ))
            ) : (
                <p className="text-lg">None</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
