
import React from 'react';
import { PortfolioItem } from '../types';

interface PortfolioTableProps {
  portfolio: PortfolioItem[];
}

const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

const PortfolioTable: React.FC<PortfolioTableProps> = ({ portfolio }) => {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-white">Portfolio Holdings</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-sm">
              <th className="py-3 px-2 sm:px-4 font-medium">Symbol</th>
              <th className="py-3 px-2 sm:px-4 font-medium text-right">Quantity</th>
              <th className="py-3 px-2 sm:px-4 font-medium text-right">Current Value</th>
              <th className="py-3 px-2 sm:px-4 font-medium text-right">Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.length > 0 ? portfolio.sort((a,b) => b.currentValue - a.currentValue).map(item => {
              const gainLossColor = item.gainLoss >= 0 ? 'text-green-400' : 'text-red-400';
              return (
              <tr key={item.symbol} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-2 sm:px-4 font-bold">{item.symbol}</td>
                <td className="py-3 px-2 sm:px-4 text-right">{item.quantity.toFixed(4)}</td>
                <td className="py-3 px-2 sm:px-4 text-right">{formatCurrency(item.currentValue)}</td>
                <td className={`py-3 px-2 sm:px-4 text-right font-medium ${gainLossColor}`}>{formatCurrency(item.gainLoss)}</td>
              </tr>
            )}) : (
                <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">No holdings found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioTable;
