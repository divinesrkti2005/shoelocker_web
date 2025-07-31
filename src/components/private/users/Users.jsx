import React from "react";
import { FaEdit, FaTrash, FaEye, FaUserCheck, FaUserTimes } from "react-icons/fa";

const Users = () => {
  // Mock Data (Replace with actual API fetch)
  const users = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      role: "Customer", 
      status: "Active",
      joinDate: "2024-01-15",
      totalOrders: 12,
      totalSpent: "₹45,000"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      role: "Customer", 
      status: "Active",
      joinDate: "2024-02-20",
      totalOrders: 8,
      totalSpent: "₹32,500"
    },
    { 
      id: 3, 
      name: "Michael Lee", 
      email: "michael.lee@example.com", 
      role: "Customer", 
      status: "Inactive",
      joinDate: "2023-11-10",
      totalOrders: 3,
      totalSpent: "₹8,500"
    },
    { 
      id: 4, 
      name: "Sarah Wilson", 
      email: "sarah.wilson@example.com", 
      role: "Customer", 
      status: "Active",
      joinDate: "2024-03-05",
      totalOrders: 15,
      totalSpent: "₹67,800"
    },
  ];

  const handleViewUser = (userId) => {
    alert(`Viewing details for user ${userId}`);
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    alert(`User ${userId} status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-2">Customer Management</h2>
        <p className="text-gray-600">Manage your ShoeLocker customer accounts and their activity</p>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-lg rounded-xl border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total Spent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{user.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-blue-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {user.totalOrders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-green-600">{user.totalSpent}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status === "Active" ? <FaUserCheck size={10} /> : <FaUserTimes size={10} />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm font-semibold"
                      >
                        <FaEye size={12} />
                        View
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-semibold ${
                          user.status === "Active"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {user.status === "Active" ? <FaUserTimes size={12} /> : <FaUserCheck size={12} />}
                        {user.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-lg font-semibold text-gray-500">No customers found</p>
            <p className="text-sm text-gray-400">Customer data will appear here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
