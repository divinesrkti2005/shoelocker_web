import React from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const Pending = () => {
  // Mock Data (Replace with actual API fetch)
  const pendingOrders = [
    { 
      id: 1, 
      customer: "John Doe", 
      product: "Nike Air Max 270", 
      orderDate: "2025-02-17", 
      status: "Pending", 
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=60&fit=crop&crop=center",
      quantity: 1,
      total: "₹12,999"
    },
    { 
      id: 2, 
      customer: "Jane Smith", 
      product: "Adidas Ultraboost 22", 
      orderDate: "2025-02-16", 
      status: "Pending", 
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=100&h=60&fit=crop&crop=center",
      quantity: 2,
      total: "₹24,998"
    },
    { 
      id: 3, 
      customer: "Michael Lee", 
      product: "Jordan Air 1 Retro", 
      orderDate: "2025-02-15", 
      status: "Pending", 
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=60&fit=crop&crop=center",
      quantity: 1,
      total: "₹18,500"
    },
    { 
      id: 4, 
      customer: "Sarah Wilson", 
      product: "Converse Chuck Taylor", 
      orderDate: "2025-02-14", 
      status: "Pending", 
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=100&h=60&fit=crop&crop=center",
      quantity: 3,
      total: "₹8,997"
    },
  ];

  const handleApprove = (orderId) => {
    // Add API call to approve order
    alert(`Order ${orderId} approved successfully!`);
  };

  const handleCancel = (orderId) => {
    // Add API call to cancel order
    alert(`Order ${orderId} cancelled!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-2">Pending Orders</h2>
        <p className="text-gray-600">Review and manage customer orders awaiting confirmation</p>
      </div>

      {/* Pending Orders Table */}
      <div className="bg-white shadow-lg rounded-xl border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">Product Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Order Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200">
                  {/* Product Image Column */}
                  <td className="px-6 py-4">
                    <img 
                      src={order.image} 
                      alt={order.product} 
                      className="w-20 h-16 object-cover rounded-lg shadow-md" 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-blue-600">{order.product}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {order.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-green-600">{order.total}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.orderDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(order.id)}
                        className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-sm font-semibold"
                      >
                        <FaCheck size={12} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 text-sm font-semibold"
                      >
                        <FaTimes size={12} />
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {pendingOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-lg font-semibold text-gray-500">No pending orders</p>
            <p className="text-sm text-gray-400">All orders have been processed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pending;
