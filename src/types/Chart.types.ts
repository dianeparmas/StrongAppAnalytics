import { ParsedResultData } from "./strongAppAnalytics.types";

export interface ChartProps {
  chartData: ParsedResultData[];
  selectedExercises: string[];
}

export type Dataset = {
  borderColor: string;
  data: { x: number; y: number | null; }[];
  label: string;
  pointBackgroundColor: string[];
  pointBorderColor: string;
  pointRadius: number;
  pointStyle: string;
};

export type ChartData = {
  datasets: Dataset[];
  labels: string[];
};

export type CompiledData = {
  [key: string]: {
    [key: string]: number;
  };
};
