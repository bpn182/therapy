"use client";
import { useClaimStatListQuery } from "@/Query/claim.query";
import { useInsuranceListQuery } from "@/Query/insurance.query";
import { useUserListQuery } from "@/Query/user.query";
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
  const { data: users = [] } = useUserListQuery("USER");
  const { data: providers = [] } = useUserListQuery("THERAPY_PROVIDER");
  const { data: insurances = [] } = useInsuranceListQuery();
  const { data: ClaimStats = [] } = useClaimStatListQuery();

  const roles = mockUsers.reduce((acc: any, user: any) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: "Users", value: users.length },
    { name: "Providers", value: providers.length },
    { name: "Insurances", value: insurances.length },
  ];
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

  const options: any = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

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
          data={ClaimStats}
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
          <Bar dataKey="data" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
