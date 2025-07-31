import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = async (userData) => {
    const response = await axios.post("/api/v1/auth/register", userData);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert("Registration successful! 🎉");
      console.log("User registered:", data);
    },
    onError: (error) => {
      alert("Registration failed. Please try again.");
      console.error("Error:", error);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match! ❌");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="absolute top-5 left-5">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SL</span>
            </div>
            <span className="text-2xl font-bold text-blue-800">ShoeLocker</span>
          </div>
        </Link>
      </div>
      <div className="relative flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=800&fit=crop&crop=center"
            alt="ShoeLocker Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-cyan-700/60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Join ShoeLocker!</h2>
              <p className="text-blue-100">Create your account and start your sneaker journey</p>
            </div>
          </div>
        </div>
        <div className="w-full p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">
            Create Your Account
          </h2>
          <p className="mb-8 text-sm text-center text-gray-600">
            By creating an account, you agree to our{" "}
            <Link to="/privacy" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
              Terms of Use
            </Link>
            .
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="fname"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="fname"
                  type="text"
                  name="fname"
                  placeholder="John"
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lname"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lname"
                  type="text"
                  name="lname"
                  placeholder="Doe"
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="123-456-7890"
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg transform hover:scale-105"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center justify-center my-8">
            <span className="w-16 h-px bg-gray-300"></span>
            <span className="mx-4 text-sm text-gray-500 font-medium">OR</span>
            <span className="w-16 h-px bg-gray-300"></span>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="p-3 text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-blue-300 transition-all duration-300">
              <FaGoogle size={20} />
            </button>
            <button className="p-3 text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-blue-300 transition-all duration-300">
              <FaFacebook size={20} />
            </button>
            <button className="p-3 text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-blue-300 transition-all duration-300">
              <FaApple size={20} />
            </button>
          </div>

          <p className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
