"use client";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { mockClaims } from "@/constants/mock";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const statusCountData = {
  labels: ["PENDING", "APPROVED", "REJECTED", "REQUIRES ACTION"],
  datasets: [
    {
      label: "Status Count",
      data: [
        mockClaims.filter((claim) => claim.status === "PENDING").length,
        mockClaims.filter((claim) => claim.status === "APPROVED").length,
        mockClaims.filter((claim) => claim.status === "REJECTED").length,
        mockClaims.filter((claim) => claim.status === "REQUIRES ACTION").length,
      ],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Charts = () => {
  return (
    <main>
      <div className="flex space-x-10">
        <div className="flex-1">
          <h2>Claims Status</h2>
          <Bar data={statusCountData} />
        </div>
      </div>
    </main>
  );
};

export default Charts;
