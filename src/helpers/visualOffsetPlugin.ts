import { ChartType, Plugin } from "chart.js";

interface VisualOffsetOptions {
  offset?: number;
}

const visualOffsetPlugin: Plugin<ChartType, VisualOffsetOptions> = {
  id: "visualOffset",
  beforeDraw(chart, _args, options) {
    const { datasets } = chart.data;
    const {
      scales: { y },
    } = chart;
    // Offset amount, default to a small value
    const offset = options.offset || 5;

    // Check if there are multiple datasets and if the y-scale exists
    if (datasets.length <= 1 || !y) {
      return;
    }

    datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (!meta || !meta.data) {
        return;
      }

      meta.data.forEach((point, pointIndex) => {
        const originalValue = dataset.data[pointIndex] as number;

        // Find other datasets with the same value at the same index
        const overlappingDatasets = datasets.filter(
          (d, i) => i !== datasetIndex && d.data[pointIndex] === originalValue,
        );

        if (overlappingDatasets.length > 0) {
          // Calculate the new Y position to create a visual separation
          const totalOverlaps = overlappingDatasets.length + 1;
          const center = (totalOverlaps - 1) / 2;
          const shift = (datasetIndex - center) * offset;

          point.y = y.getPixelForValue(originalValue) + shift;
        }
      });
    });
  },
};

export default visualOffsetPlugin;
