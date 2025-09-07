import { ParsedResultData } from "./strongAppAnalytics.types";

export interface ChartProps {
  chartData: ParsedResultData[];
  selectedExercises: string[];
}

// export type Dataset = {
//   borderColor: string;
//   data: { x: number; y: number | null }[];
//   label: string;
//   pointBackgroundColor: string[];
//   pointBorderColor: string;
//   pointRadius: number;
//   pointStyle: string;
// };

// This is the type for single-exercise sets
export type SetDataset = {
  label: string;
  data: (number | null)[];
  backgroundColor: string;
  borderColor: string;
  pointStyle: string;
  pointRadius: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
};

// This is the type for multiple exercises
export type MultipleExerciseDataset = {
  borderColor: string;
  // data: { x: number; y: number | null }[];
  data: (number | null)[];
  label: string;
  pointBackgroundColor: string[];
  pointBorderColor: string;
  pointRadius: number;
  pointStyle: string;
};

export type ChartData = {
  // datasets: Dataset[];
  datasets: SetDataset[] | MultipleExerciseDataset[];
  labels: string[];
  rotationAngle: number;
};

export type CompiledData = {
  [key: string]: {
    [key: string]: number;
  };
};

export interface GroupedExercisesBySet {
  [key: string]: ParsedResultData[];
}

export interface ProcessChartDataParams {
  chartData: ParsedResultData[];
  selectedExercises: string[];
  metricType: string;
}

export interface VisualOffsetPluginParams {
  chartData: ParsedResultData[];
  selectedExercises: string[];
  metricType: string;
}

export type MetricKeys = 'Weight' | 'Reps' | 'Duration';