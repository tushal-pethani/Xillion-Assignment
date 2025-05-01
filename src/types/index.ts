export interface Trade {
  symbol: string;
  name: string;
  buy: {
    min: number;
    max: number;
  };
  stopLoss: number;
  target: number;
  expectedReturn: number;
}

export interface PositionalTrade {
  symbol: string;
  name: string;
  returnPercentage: number;
  targetHitDate: string;
  term: 'Short Term' | 'Medium Term' | 'Long Term';
  type: string;
}

export interface Portfolio {
  currentValue: number;
  unusedFunds: number;
} 