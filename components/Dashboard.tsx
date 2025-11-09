
import React, { useState, useEffect } from 'react';
import * as stockService from '../services/stockService';
import { Stats, PortfolioItem, Reward, HistoricalDataPoint } from '../types';
import StatsCards from './StatsCards';
import PortfolioTable from './PortfolioTable';
import TodaysRewards from './TodaysRewards';
import HistoricalChart from './HistoricalChart';
import RewardForm from './RewardForm';

interface DashboardProps {
  userId: string;
  onDataRefresh: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userId, onDataRefresh }) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [todaysRewards, setTodaysRewards] = useState<Reward[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, portfolioData, todaysRewardsData, historicalData] = await Promise.all([
          stockService.getStats(userId),
          stockService.getPortfolio(userId),
          stockService.getTodaysRewards(userId),
          stockService.getHistoricalINR(userId),
        ]);
        setStats(statsData);
        setPortfolio(portfolioData);
        setTodaysRewards(todaysRewardsData);
        setHistoricalData(historicalData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p>Loading dashboard...</p></div>;
  }
  
  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <HistoricalChart data={historicalData} />
        </div>
        <div className="lg:col-span-1">
            <RewardForm onReward={onDataRefresh} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioTable portfolio={portfolio} />
          <TodaysRewards rewards={todaysRewards} />
      </div>
    </div>
  );
};

export default Dashboard;
