import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const earningsDataByYear = {
  2023: [600, 1300, 2800, 2850, 2550, 450, 900, 1300, 400, 1200, 1500, 2000],
  2024: [800, 1100, 2300, 2700, 2650, 650, 1000, 1400, 700, 1300, 1600, 2100],
  2025: [900, 1250, 2500, 2800, 2700, 800, 1200, 1500, 900, 1400, 1700, 2200],
};

const EarningsChart = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: `Earnings (${selectedYear})`,
        data: earningsDataByYear[selectedYear],
        borderColor: "#00a0c6",
        backgroundColor: "#00a0c6",
        tension: 0,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Earnings</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-2 py-1 rounded-md text-sm"
        >
          {Object.keys(earningsDataByYear).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Line data={lineData} options={lineOptions} />
    </div>
  );
};

export default EarningsChart;
