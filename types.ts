
import { STOCK_SYMBOLS } from './constants';

export type StockSymbol = typeof STOCK_SYMBOLS[number];

export interface User {
  id: string;
  name: string;
}

export interface Reward {
  id: string;
  userId: string;
  symbol: StockSymbol;
  quantity: number;
  rewardedAt: Date;
  purchasePrice: number;
}

export interface PortfolioItem {
  symbol: StockSymbol;
  quantity: number;
  currentPrice: number;
  currentValue: number;
  totalCost: number;
  gainLoss: number;
}

export interface Stats {
  totalSharesToday: { [key in StockSymbol]?: number };
  currentPortfolioValue: number;
  totalPortfolioCost: number;
}

export interface HistoricalDataPoint {
  date: string;
  value: number;
}
