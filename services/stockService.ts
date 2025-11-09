
import { Reward, Stats, PortfolioItem, HistoricalDataPoint, StockSymbol, User } from '../types';
import { STOCK_SYMBOLS, STOCK_BASE_PRICES, USERS } from '../constants';

// --- In-memory database ---
let mockRewards: Reward[] = [];

// --- Helper Functions ---
const getToday = (): Date => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const subtractDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
};

// --- Initial Data Seeding ---
const seedInitialData = () => {
  if (mockRewards.length > 0) return;
  
  const today = new Date();
  
  USERS.forEach(user => {
    // Today's rewards
    mockRewards.push({
      id: `rew-${Math.random()}`,
      userId: user.id,
      symbol: 'TCS',
      quantity: Math.random() * 2,
      rewardedAt: new Date(),
      purchasePrice: STOCK_BASE_PRICES['TCS'] * (0.98 + Math.random() * 0.04)
    });

    // Historical rewards
    for(let i = 1; i < 45; i++) {
        const symbol = STOCK_SYMBOLS[i % STOCK_SYMBOLS.length];
        mockRewards.push({
            id: `rew-${Math.random()}`,
            userId: user.id,
            symbol: symbol,
            quantity: Math.random() * 5,
            rewardedAt: subtractDays(today, i * 2),
            purchasePrice: STOCK_BASE_PRICES[symbol] * (0.95 + Math.random() * 0.1)
        });
    }
  });
};

seedInitialData();

// --- Mock Price API ---
const getPrice = (symbol: StockSymbol, date?: Date): number => {
    const basePrice = STOCK_BASE_PRICES[symbol];
    if (date) {
        const today = new Date();
        const daysAgo = (today.getTime() - date.getTime()) / (1000 * 3600 * 24);
        const volatility = Math.sin(daysAgo / 5) * 0.1; // Simulate some cycles
        return basePrice * (1 + volatility + (Math.random() - 0.5) * 0.05);
    }
    // Live price
    return basePrice * (0.98 + Math.random() * 0.04);
};

// --- Mock API Endpoints ---

export const rewardUser = async (userId: string, symbol: StockSymbol, quantity: number): Promise<Reward> => {
  const newReward: Reward = {
    id: `rew-${Date.now()}-${Math.random()}`,
    userId,
    symbol,
    quantity,
    rewardedAt: new Date(),
    purchasePrice: getPrice(symbol),
  };
  mockRewards.push(newReward);
  console.log('Reward added:', newReward);
  return newReward;
};

export const getTodaysRewards = async (userId: string): Promise<Reward[]> => {
  const todayStart = getToday();
  return mockRewards.filter(r => r.userId === userId && r.rewardedAt >= todayStart);
};

export const getPortfolio = async (userId: string): Promise<PortfolioItem[]> => {
    const holdings: { [key in StockSymbol]?: { quantity: number, totalCost: number } } = {};

    mockRewards
        .filter(r => r.userId === userId)
        .forEach(r => {
            if (!holdings[r.symbol]) {
                holdings[r.symbol] = { quantity: 0, totalCost: 0 };
            }
            holdings[r.symbol]!.quantity += r.quantity;
            holdings[r.symbol]!.totalCost += r.quantity * r.purchasePrice;
        });

    const portfolio: PortfolioItem[] = Object.entries(holdings).map(([symbol, data]) => {
        const currentPrice = getPrice(symbol as StockSymbol);
        const currentValue = data.quantity * currentPrice;
        return {
            symbol: symbol as StockSymbol,
            quantity: data.quantity,
            currentPrice,
            currentValue,
            totalCost: data.totalCost,
            gainLoss: currentValue - data.totalCost,
        };
    });
    return portfolio;
};


export const getStats = async (userId: string): Promise<Stats> => {
  const todaysRewards = await getTodaysRewards(userId);
  const portfolio = await getPortfolio(userId);

  const totalSharesToday = todaysRewards.reduce((acc, reward) => {
    acc[reward.symbol] = (acc[reward.symbol] || 0) + reward.quantity;
    return acc;
  }, {} as { [key in StockSymbol]?: number });

  const currentPortfolioValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalPortfolioCost = portfolio.reduce((sum, item) => sum + item.totalCost, 0);
  
  return { totalSharesToday, currentPortfolioValue, totalPortfolioCost };
};


export const getHistoricalINR = async (userId: string): Promise<HistoricalDataPoint[]> => {
    const history: HistoricalDataPoint[] = [];
    const today = new Date();
    
    // Go back 60 days
    for (let i = 60; i >= 0; i--) {
        const date = subtractDays(today, i);
        const userRewardsUpToDate = mockRewards.filter(r => r.userId === userId && r.rewardedAt <= date);

        const holdings: { [key in StockSymbol]?: number } = {};
        userRewardsUpToDate.forEach(r => {
            holdings[r.symbol] = (holdings[r.symbol] || 0) + r.quantity;
        });

        const dayValue = Object.entries(holdings).reduce((total, [symbol, quantity]) => {
            const historicalPrice = getPrice(symbol as StockSymbol, date);
            return total + (quantity * historicalPrice);
        }, 0);

        history.push({
            date: date.toISOString().split('T')[0],
            value: parseFloat(dayValue.toFixed(2)),
        });
    }

    return history;
};
