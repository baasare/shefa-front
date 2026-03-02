export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Portfolio {
  id: number;
  name: string;
  description: string;
  initial_capital: number;
  current_value: number;
  created_at: string;
  updated_at: string;
}

export interface Strategy {
  id: number;
  name: string;
  description: string;
  type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  symbol: string;
  order_type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'PENDING' | 'FILLED' | 'CANCELLED' | 'REJECTED';
  created_at: string;
  executed_at?: string;
}

export interface Agent {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
