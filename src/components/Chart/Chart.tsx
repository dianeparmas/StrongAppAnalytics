import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({ chartData = [], title }) => {
    console.log(chartData);
  const chartConfig = {
    labels: chartData.map((item) => item.date),
    // labels: ["t", "k", "k",],
    datasets: [
      {
        label: "Max Weight (kg)",
        data: chartData.map((item) => item.maxWeight),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ]
  };

  const options = {
    responsive: true,
    type: 'line',
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Progress for: ${title}` },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Line options={options} data={chartConfig} />;
};

export default Chart;
