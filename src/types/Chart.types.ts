import { ParsedResultData } from "./strongAppAnalytics.types";

export interface ChartProps {
  chartData: ParsedResultData[];
  selectedExercises: string[];
}

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

export type MultipleExerciseDataset = {
  borderColor: string;
  data: (number | null)[];
  label: string;
  pointBackgroundColor: string[];
  pointBorderColor: string;
  pointRadius: number;
  pointStyle: string;
};

export type ChartData = {
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
  isDarkMode: boolean;
  selectedExercises: string[];
  metricType: string;
}

export interface VisualOffsetPluginParams {
  chartData: ParsedResultData[];
  selectedExercises: string[];
  metricType: string;
}

export type MetricKeys = "Weight" | "Reps" | "Duration";
