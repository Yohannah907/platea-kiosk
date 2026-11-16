export type ScreenId =
  | 'welcome'
  | 'login'
  | 'menu'
  | 'cart'
  | 'balance'
  | 'success';

export type Category = 'All Items' | 'Meals' | 'Snacks' | 'Desserts' | 'Drinks';

export type PaymentMethod = 'Cash' | 'GCash' | 'PayMaya';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  emoji: string;
  contain?: boolean;
  keywords: string;
}

export type CartMap = Record<string, number>;

export interface OrderSummary {
  orderNumber: string;
  total: number;
  paymentMethod: PaymentMethod;
  status: 'Confirmed';
}
