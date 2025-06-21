import React from "react";
import Footer from "../../components/common/customer/Footer";
import Navbar from "../../components/common/customer/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-6">About ShoeLocker</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your premier destination for the latest sneaker trends and premium footwear. 
              We bring you the world's finest sneakers with unmatched quality and style.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-blue-100 leading-relaxed mb-6">
                  To provide sneaker enthusiasts with authentic, high-quality footwear that combines 
                  style, comfort, and innovation. We believe in delivering exceptional products that 
                  help you step into your best self.
                </p>
                <h3 className="text-2xl font-bold text-white mb-3">Why Choose ShoeLocker?</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Curated collection of premium sneakers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Authentic products with guaranteed quality
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Expert customer support and guidance
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Fast and secure worldwide shipping
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
                <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Story</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Founded by sneaker enthusiasts, ShoeLocker began with a simple vision: to create 
                  a platform where people could discover and purchase the world's finest sneakers. 
                  Today, we're proud to serve customers worldwide with our carefully curated collection.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1000+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center p-4 bg-cyan-50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600">50+</div>
                    <div className="text-sm text-gray-600">Premium Brands</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Our dedicated team of sneaker experts is here to help you find the perfect pair 
              and ensure you have the best shopping experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">JD</span>
                </div>
                <h4 className="text-xl font-semibold text-blue-800">John Doe</h4>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              {/* Team Member 2 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">JS</span>
                </div>
                <h4 className="text-xl font-semibold text-blue-800">Jane Smith</h4>
                <p className="text-gray-600">Head of Operations</p>
              </div>
              {/* Team Member 3 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">MJ</span>
                </div>
                <h4 className="text-xl font-semibold text-blue-800">Mike Johnson</h4>
                <p className="text-gray-600">Customer Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs; 
