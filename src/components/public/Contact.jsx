import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-6">Contact ShoeLocker</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our sneakers or need assistance? We'd love to hear from you. 
              Our team is here to help you find the perfect pair!
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <FaPhone className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-800">Phone</h3>
              <p className="text-gray-700 mt-2">+1 (123) 456-7890</p>
              <p className="text-sm text-gray-500">Mon-Fri: 9AM-6PM</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-800">Email</h3>
              <p className="text-gray-700 mt-2">support@shoelocker.com</p>
              <p className="text-sm text-gray-500">24/7 Support</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-800">Address</h3>
              <p className="text-gray-700 mt-2">123 Sneaker Street</p>
              <p className="text-sm text-gray-500">Fashion District, NY 10001</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-800 font-semibold mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact; 
