export type SafetyLevel = 'SAFE' | 'WATCH' | 'ALERT' | 'CRISIS';

export type SafetyCluster = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface SafetyPattern {
  cluster: SafetyCluster;
  phrases: string[];
}

export interface SafetyResult {
  level: SafetyLevel;
  score: number;
  matchedClusters: SafetyCluster[];
}
