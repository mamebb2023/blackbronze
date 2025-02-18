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
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
  title: string;
}

const LineChart = ({ labels, datasets, title }: LineChartProps) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      tension: 0.4,
    })),
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: datasets.length > 1 ? true : false, // Enable legend for multiple network datasets
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        display: false,
        // ticks: {
        //   callback: function (value: number | string) {
        //     return value === 100 ? value : "";
        //   },
        // },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            return value;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
