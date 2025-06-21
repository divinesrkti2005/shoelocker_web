import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">SL</span>
              </div>
              <span className="text-2xl font-bold">ShoeLocker</span>
            </div>
            <p className="text-blue-100 mb-4 max-w-md">
              Your premier destination for the latest sneaker trends and premium footwear. 
              Step into style with our curated collection of the world's finest sneakers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/packages" className="text-blue-100 hover:text-white transition-colors">Sneakers</Link>
              </li>
              <li>
                <Link to="/aboutus" className="text-blue-100 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-200">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-blue-100 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-100 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-blue-100 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/review" className="text-blue-100 hover:text-white transition-colors">Reviews</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-8 text-center">
          <p className="text-blue-200">
            © 2024 ShoeLocker. All rights reserved. | Designed with ❤️ for sneaker enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
