import React from "react";
import { FaBook, FaBox, FaClipboardList, FaDollarSign, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  // Mock Data (Replace with API Fetch)
  const stats = [
    { id: 1, title: "Total Customers", value: "1,240", icon: <FaUsers size={24} />, color: "bg-gradient-to-r from-blue-500 to-blue-600" },
    { id: 2, title: "Total Products", value: "58", icon: <FaBox size={24} />, color: "bg-gradient-to-r from-cyan-500 to-blue-500" },
    { id: 3, title: "Total Orders", value: "3,450", icon: <FaClipboardList size={24} />, color: "bg-gradient-to-r from-blue-600 to-indigo-600" },
    { id: 4, title: "Total Revenue", value: "$12,480", icon: <FaDollarSign size={24} />, color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
  ];

  const recentOrders = [
    { id: 1, customer: "John Doe", product: "Nike Air Max 270", date: "2024-08-15", status: "Confirmed" },
    { id: 2, customer: "Jane Smith", product: "Adidas Ultraboost", date: "2024-08-14", status: "Pending" },
    { id: 3, customer: "Mike Johnson", product: "Jordan Air 1", date: "2024-08-13", status: "Canceled" },
    { id: 4, customer: "Emily Davis", product: "Converse Chuck Taylor", date: "2024-08-12", status: "Confirmed" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-blue-100">
        <h1 className="text-2xl font-bold text-blue-800">Welcome back, Admin!</h1>
        <p className="text-gray-600 mt-1">Here's a summary of your ShoeLocker dashboard.</p>
      </div>

      {/* Dashboard Title */}
      <h2 className="text-2xl font-semibold text-blue-800">Dashboard Overview</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className={`p-6 rounded-xl text-white shadow-lg flex items-center gap-4 ${stat.color} transform hover:scale-105 transition-transform duration-300`}>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm opacity-90">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-blue-100 text-gray-600">
                <th className="py-3 px-4 text-sm font-semibold">CUSTOMER</th>
                <th className="py-3 px-4 text-sm font-semibold">PRODUCT</th>
                <th className="py-3 px-4 text-sm font-semibold">DATE</th>
                <th className="py-3 px-4 text-sm font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-blue-50 hover:bg-blue-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium">{order.customer}</td>
                  <td className="py-3 px-4 text-sm">{order.product}</td>
                  <td className="py-3 px-4 text-sm">{order.date}</td>
                  <td className={`py-2 px-4 font-semibold rounded-full text-xs ${
                    order.status === "Confirmed" 
                      ? "bg-green-100 text-green-700" 
                      : order.status === "Pending" 
                      ? "bg-yellow-100 text-yellow-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
