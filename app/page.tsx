"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Sample Data
  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4500 },
    { name: "May", revenue: 6000 },
  ];

  const usersData = [
    { name: "USA", users: 400 },
    { name: "India", users: 300 },
    { name: "UK", users: 200 },
    { name: "Canada", users: 100 },
  ];

  const pieData = [
    { name: "Organic", value: 400 },
    { name: "Ads", value: 300 },
    { name: "Referral", value: 300 },
  ];

  const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

  const tableData = [
    { id: 1, customer: "John Doe", amount: "$1200", status: "Completed" },
    { id: 2, customer: "Jane Smith", amount: "$800", status: "Pending" },
    { id: 3, customer: "Alex Johnson", amount: "$560", status: "Completed" },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`shadow-md px-6 py-4 flex justify-between items-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold">ADmyBRAND Insights</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>

      {/* Page Content */}
      <main className="p-6 space-y-8">
        <h2 className="text-xl font-semibold">Overview</h2>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card darkMode={darkMode} title="Revenue" value="$45,200" change="+12%" />
          <Card darkMode={darkMode} title="Active Users" value="8,431" change="+5%" />
          <Card darkMode={darkMode} title="Conversions" value="1,024" change="+9%" />
          <Card darkMode={darkMode} title="Growth" value="18%" change="Steady" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartContainer darkMode={darkMode} title="Monthly Revenue">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ChartContainer>

          <ChartContainer darkMode={darkMode} title="Users by Country">
            <BarChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ChartContainer>

          <ChartContainer darkMode={darkMode} title="Traffic Sources">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={30}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </div>

        {/* Table Section */}
        <div
          className={`p-4 rounded-xl shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-300">
                <th className="p-2">Customer</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-200 hover:${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <td className="p-2">{row.customer}</td>
                  <td className="p-2">{row.amount}</td>
                  <td className="p-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// Reusable Card Component
function Card({
  darkMode,
  title,
  value,
  change,
}: {
  darkMode: boolean;
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div
      className={`rounded-xl shadow-md p-4 hover:shadow-lg transition ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h3 className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-green-500 text-sm">{change}</p>
    </div>
  );
}

// Chart Container Wrapper (FIXED)
function ChartContainer({
  darkMode,
  title,
  children,
}: {
  darkMode: boolean;
  title: string;
  children: React.ReactElement; // <-- Fixed type for Vercel
}) {
  return (
    <div
      className={`p-4 rounded-xl shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
