// OrdersOverview.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersOverview = () => {
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Delivery Orders",
        data: [280, 830, 540, 880, 130, 200, 210, 520, 240, 340, 580, 460],
        backgroundColor: "#0086A8",
      },
      {
        label: "Takeaway Orders",
        data: [110, 340, 390, 300, 630, 980, 490, 140, 290, 250, 510, 120],
        backgroundColor: "#ADE3EB",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 200,
        },
      },
    },
  };

  return (
    <div className="p-6 rounded-md shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders Overview</h2>
        <select className="border rounded-md px-2 py-1 text-sm">
          <option>2025</option>
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OrdersOverview;
