"use client";
import { mockUsers } from "@/constants/mock";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function AdminPage() {
  const roles = mockUsers.reduce((acc: any, user: any) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(roles).map(([name, value]) => ({ name, value }));
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

  const options: any = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const claimData: any = [
    {
      name: "Month 5",
      approvedClaims: 2,
    },
    {
      name: "Month 4",
      approvedClaims: 5,
    },
    {
      name: "Month 3",
      approvedClaims:4,
    },
    {
      name: "Month 2",
      approvedClaims: 3,
    },
    {
      name: "Month 1",
      approvedClaims: 8,
    },
  ];
  return (
    <div className="flex flex-row items-center">
      <div>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>{" "}
      </div>

      <div>
        <BarChart
          width={400}
          height={400}
          data={claimData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="approvedClaims" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
