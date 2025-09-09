import {
  ProcessChartDataParams,
  CompiledData,
  GroupedExercisesBySet,
  SetDataset,
  MultipleExerciseDataset,
} from "../types/Chart.types";

import {
  CHART_COLORS_DARK,
  CHART_COLORS_LIGHT,
  CHART_POINT_STYLES,
} from "./../constants/chartModifiers";
import exercises from "./../constants/exercises";
import METRICS from "./../constants/metrics";

import { getLabelRotation } from "./chartHelpers";

import { extractWorkoutDates, formatDateToYYYYMMDD } from "./../utils/dates";

const processChartData = ({
  chartData,
  isDarkMode,
  metricType,
  selectedExercises,
}: ProcessChartDataParams) => {
  const CHART_COLORS = isDarkMode ? CHART_COLORS_DARK : CHART_COLORS_LIGHT;
  const isDeadhang =
    selectedExercises.length === 1 &&
    selectedExercises[0] === exercises.DEADHANG;

  if (selectedExercises.length === 0 || chartData.length === 0) {
    return { labels: [], datasets: [], rotationAngle: 0 };
  }

  if (selectedExercises.length === 1) {
    const exerciseName = selectedExercises[0];
    const singleExerciseData = chartData.filter(
      (row) => row.Name === exerciseName && row.SetOrder !== "Note",
    );

    const uniqueSetOrders = [
      ...new Set(singleExerciseData.map((row) => row.SetOrder)),
    ].sort((a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }
      return String(a).localeCompare(String(b));
    });

    const grouped: GroupedExercisesBySet = uniqueSetOrders.reduce(
      (acc, setOrder) => {
        acc[setOrder] = singleExerciseData.filter(
          (row) => row.SetOrder === setOrder,
        );
        return acc;
      },
      {} as GroupedExercisesBySet,
    );

    const labels = extractWorkoutDates(grouped[uniqueSetOrders[0]] || []);
    const labelsRotationAngle = getLabelRotation(labels.length);

    const datasets: SetDataset[] = uniqueSetOrders.map((setKey, index) => {
      const { style, radius } =
        CHART_POINT_STYLES[index % CHART_POINT_STYLES.length];

      // Get the data and filter out non-numeric values
      const rawData = grouped[setKey].map(
        (row) => row[isDeadhang ? METRICS.DURATION : metricType],
      );
      // Explicitly map raw data to `(number | null)[]`
      const cleanedData = rawData.map((value) => {
        const numericValue = Number(value);
        // Check if the value is a number, otherwise return null
        if (!isNaN(numericValue) && value !== null && value !== undefined) {
          return numericValue;
        }
        // For all other cases (strings like "Note", etc.), return null.
        return null;
        // return value;
      });

      return {
        label: `Set ${setKey}`,
        data: cleanedData,
        backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
        borderColor: CHART_COLORS[index % CHART_COLORS.length].replace(
          "0.5",
          "1",
        ),
        pointStyle: style,
        pointRadius: radius,
      };
    });
    return { labels, datasets, rotationAngle: labelsRotationAngle };
  } else {
    const compiledData: CompiledData = {};
    chartData.forEach((item) => {
      if (!selectedExercises.includes(item.Name)) return;
      const workoutDate = formatDateToYYYYMMDD(new Date(item.Date));
      const rawNumericValue = Number(item[metricType]); // mock datal on stirng
      const exercise = item.Name;

      if (typeof rawNumericValue === "number" && rawNumericValue !== null) {
        const numericValue = rawNumericValue;
        if (!compiledData[exercise]) compiledData[exercise] = {};
        if (
          !compiledData[exercise][workoutDate] ||
          numericValue > compiledData[exercise][workoutDate]
        ) {
          compiledData[exercise][workoutDate] = numericValue;
        }
      }
    });

    const allDates = selectedExercises.flatMap((exerciseName) =>
      Object.keys(compiledData[exerciseName] || {}),
    );
    const uniqueDates = [...new Set(allDates)].sort();

    const newDatasets: MultipleExerciseDataset[] = selectedExercises.map(
      (exerciseName, index) => {
        const exerciseProgress = compiledData[exerciseName] || {};
        let lastKnownValue: number | null = null;
        const dataForChart: (number | null)[] = [];
        const backgroundColors: string[] = [];

        uniqueDates.forEach((date) => {
          const currentValue = exerciseProgress[date] || null;
          if (currentValue !== null) {
            lastKnownValue = currentValue;
            dataForChart.push(currentValue);
            backgroundColors.push(CHART_COLORS[index % CHART_COLORS.length]);
          } else {
            dataForChart.push(lastKnownValue);
            backgroundColors.push("rgba(195, 195, 195, 0.3)");
          }
        });
        const { style, radiusMulti } =
          CHART_POINT_STYLES[index % CHART_POINT_STYLES.length];

        return {
          label: exerciseName,
          data: dataForChart,
          borderColor: CHART_COLORS[index % CHART_COLORS.length].replace(
            "0.5",
            "1",
          ),
          pointBorderColor: CHART_COLORS[index % CHART_COLORS.length],
          pointBackgroundColor: backgroundColors,
          pointRadius: radiusMulti,
          pointStyle: style,
        };
      },
    );

    return {
      labels: uniqueDates,
      datasets: newDatasets,
      rotationAngle: getLabelRotation(uniqueDates.length),
    };
  }
};

export default processChartData;
