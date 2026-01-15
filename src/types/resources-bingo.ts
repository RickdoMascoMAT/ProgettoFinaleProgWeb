export interface BingoRoot {
  success: boolean;
  lastUpdated: number;
  id: number;
  name: string;
  start: number;
  end: number;
  modifier: string;
  goals: Goal[];
}

export interface Goal {
  id: string;
  name: string;
  tiers?: number[];
  progress?: number;
  lore: string;
  fullLore: string[];
  requiredAmount?: number;
}
