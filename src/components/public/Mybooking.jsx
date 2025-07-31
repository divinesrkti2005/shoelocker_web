import React, { useState, useEffect } from "react";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";
import axios from "axios";

const MyBooking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You must be logged in to see your orders.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/v1/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      case "delivered":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "✅";
      case "pending":
        return "⏳";
      case "cancelled":
        return "❌";
      case "delivered":
        return "📦";
      default:
        return "📋";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          My Orders
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Track your sneaker orders and delivery status.
        </p>

        <div className="flex flex-col items-center space-y-6">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.href = "/login"}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
              >
                Login
              </button>
            </div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg border border-gray-200"
              >
                <div className="flex items-start space-x-6">
                  <img
                    src={`http://localhost:3000/uploads/${order.sneakerId?.image}`}
                    alt={order.sneakerId?.name}
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {order.sneakerId?.name || "Sneaker"}
                        </h2>
                        <p className="text-gray-600">
                          Brand: {order.sneakerId?.brand || "Unknown"}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600">
                          <span className="font-semibold">Order ID:</span> {order._id}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Quantity:</span> {order.quantity}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Size:</span> {order.size}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Color:</span> {order.color}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          <span className="font-semibold">Total Amount:</span> ₹{order.totalAmount?.toLocaleString()}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Payment Method:</span> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Delivery Address:</span>
                        </p>
                        <p className="text-gray-600 text-sm ml-4">
                          {order.address}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Phone:</span> {order.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-600 text-lg mb-4">You have no orders yet.</p>
              <button 
                onClick={() => window.location.href = "/sneakers"}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBooking;
