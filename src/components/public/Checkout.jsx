import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sneakerData, setSneakerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    quantity: 1,
    size: "",
    color: "",
    address: "",
    phone: "",
    paymentMethod: "cod"
  });

  useEffect(() => {
    fetchSneakerDetails();
  }, [id]);

  const fetchSneakerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/shoes/${id}`);
      setSneakerData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sneaker details:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.size || !formData.color || !formData.address || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const orderData = {
        sneakerId: id,
        quantity: formData.quantity,
        size: formData.size,
        color: formData.color,
        address: formData.address,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
        totalAmount: sneakerData.price * formData.quantity
      };

      const response = await axios.post("http://localhost:3000/api/v1/bookings", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order placed successfully!");
      navigate("/mybooking");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <p className="text-center text-gray-600">Loading sneaker details...</p>
        </div>
      </>
    );
  }

  if (!sneakerData) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <p className="text-center text-red-500">Sneaker not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Sneaker Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📌 Order Summary</h3>
            <div className="flex flex-col items-center">
              <img 
                src={`http://localhost:3000/uploads/${sneakerData.image}`} 
                alt={sneakerData.name} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="mt-4 w-full">
                <h4 className="text-xl font-semibold text-gray-700">{sneakerData.name}</h4>
                <p className="text-gray-500">{sneakerData.brand}</p>
                <p className="text-gray-800 font-bold mt-2 text-lg">₹{sneakerData.price}</p>
                <p className="text-gray-600 mt-2">{sneakerData.description}</p>

                {/* Available Sizes */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-700">👟 Available Sizes</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sneakerData.sizes && sneakerData.sizes.map((size, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Colors */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-700">🎨 Available Colors</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sneakerData.colors && sneakerData.colors.map((color, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">📝 Order Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                <select
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Size *</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Size</option>
                  {sneakerData.sizes && sneakerData.sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Color *</label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Color</option>
                  {sneakerData.colors && sneakerData.colors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Delivery Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your delivery address"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Order Summary</h4>
                <div className="flex justify-between mb-2">
                  <span>Price per item:</span>
                  <span>₹{sneakerData.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantity:</span>
                  <span>{formData.quantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Size:</span>
                  <span>{formData.size || "Not selected"}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Color:</span>
                  <span>{formData.color || "Not selected"}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₹{sneakerData.price * formData.quantity}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold text-lg"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
