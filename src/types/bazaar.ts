export interface BazaarRoot {
  success: boolean;
  lastUpdated: number;
  products: { [key: string]: Product };
}

export interface Product {
  product_id: string;
  sell_summary: Summary[];
  buy_summary: Summary[];
  quick_status: QuickStatus;
}

export interface Summary {
  amount: number;
  pricePerUnit: number;
  orders: number;
}

export interface QuickStatus {
  productId: string;
  sellPrice: number;
  sellVolume: number;
  sellMovingWeek: number;
  sellOrders: number;
  buyPrice: number;
  buyVolume: number;
  buyMovingWeek: number;
  buyOrders: number;
}
