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
import { Doughnut } from "react-chartjs-2";

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

export default function CustomersChart() {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);


  const customersDataByYear = {
    "2023": [6, 7, 16, 8, 18, 4, 14, 9, 6, 5, 10, 7],
    "2024": [7, 9, 15, 5, 19, 6, 10, 11, 4, 7, 8, 5],
    "2025": [5, 8, 18, 6, 20, 5, 12, 10, 5, 6, 9, 6],
  };

  const pieData = {
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
        label: "Customers",
        data: customersDataByYear[selectedYear],
        backgroundColor: [
          "#66CCFF",
          "#FF9966",
          "#A3B7CC",
          "#FFE066",
          "#FF6699",
          "#FFCC99",
          "#FFE599",
          "#A8D5BA",
          "#66CCFF",
          "#C299FF",
          "#D9D9D9",
          "#FFB366",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <div className="flex justify-between items-center mb-4 py-2">
        <h2 className="text-xl font-semibold">Customers</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-2 py-1 rounded-md text-sm"
        >
          {Object.keys(customersDataByYear).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Doughnut data={pieData} />
    </div>
  );
}
