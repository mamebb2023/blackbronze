"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

interface LineChartProps {
  labels: string[];
  dataPoints: number[][];
  title: string;
  borderColor: string[];
  backgroundColor: string[];
}

const LineChart = ({
  labels,
  dataPoints,
  title,
  borderColor,
  backgroundColor,
}: LineChartProps) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor,
        backgroundColor,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Remove legend
      },
      title: {
        display: true,
        text: title, // Dynamic title
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: false,
          text: "Usage (%)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
