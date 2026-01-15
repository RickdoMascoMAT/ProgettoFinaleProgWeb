export interface SkillsRoot {
  success: boolean;
  lastUpdated: number;
  version: string;
  skills: { [key: string]: Skill };
}

export interface Skill {
  name: string;
  description: string;
  maxLevel: number;
  levels: Level[];
}

export interface Level {
  level: number;
  totalExpRequired: number;
  unlocks: string[];
}
