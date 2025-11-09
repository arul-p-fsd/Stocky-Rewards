
import { User, StockSymbol } from './types';

// FIX: Changed the definition of STOCK_SYMBOLS to use `as const` to break a circular type dependency.
// The type of STOCK_SYMBOLS is now inferred from its value, and the `StockSymbol` type in `types.ts`
// can be correctly derived from it.
export const STOCK_SYMBOLS = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK'] as const;

export const USERS: User[] = [
  { id: 'user-001', name: 'Aarav Sharma' },
  { id: 'user-002', name: 'Diya Patel' },
  { id: 'user-003', name: 'Rohan Mehta' },
];

export const STOCK_BASE_PRICES: { [key in StockSymbol]: number } = {
    'RELIANCE': 2800,
    'TCS': 3800,
    'INFY': 1500,
    'HDFCBANK': 1600,
    'ICICIBANK': 1100,
};