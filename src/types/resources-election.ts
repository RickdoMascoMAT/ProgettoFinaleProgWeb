export interface ElectionRoot {
  success: boolean;
  lastUpdated: number;
  mayor: Mayor;
}

export interface Election {
  year: number;
  candidates: Mayor[];
}

export interface Mayor {
  key: string;
  name: string;
  perks: Perk[];
  election?: Election;
  votes?: number;
}

export interface Perk {
  name: string;
  description: string;
  minister: boolean;
}
