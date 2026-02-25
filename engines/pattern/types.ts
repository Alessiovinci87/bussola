export interface PatternInsight {
  type: 'time_of_day' | 'intensity_trend' | 'frequent_situation';
  message: string;
  data: Record<string, unknown>;
}
