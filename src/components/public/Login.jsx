import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login2.jpg";

const Login = () => {
  const [email, setEmail] = useState("gayhit123@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to send login data to API
  const loginUser = async (userData) => {
    const response = await axios.post("http://localhost:3000/api/v1/auth/login", userData);
    return response.data;
  };

  // useMutation for handling login
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    },
  });

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
      {/* Logo at top left */}
      <div className="absolute top-5 left-5">
        <span className="text-sm text-gray-600 font-medium">Trek Logo</span>
      </div>

      {/* Main login card */}
      <div className="w-full max-w-4xl bg-blue-700 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex min-h-[600px]">
          {/* Left section with background */}
          <div className="hidden lg:block w-1/2 bg-blue-700 relative">
            <img 
              src={loginImage}
              alt="Trek Background" 
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right section with login form */}
          <div className="w-full lg:w-1/2 bg-blue-700 p-8 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome</h2>
              <p className="text-blue-200 mb-8">Login with your email</p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <input 
                    type="email"
                    placeholder="Enter Email"
                    className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-blue-600 text-white placeholder-blue-200 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-200 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <input 
                    type="password"
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 rounded-lg border border-blue-300 bg-blue-600 text-white placeholder-blue-200 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-200 transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="text-right">
                  <a href="#" className="text-sm text-blue-200 hover:text-white hover:underline transition-colors">
                    Forgot your password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Logging in..." : "LOGIN"}
                </button>
              </form>

              {/* OR separator */}
              <div className="flex items-center my-8">
                <div className="flex-1 border-t border-blue-300"></div>
                <span className="px-4 text-blue-200 text-sm font-medium">OR</span>
                <div className="flex-1 border-t border-blue-300"></div>
              </div>

              {/* Social login buttons */}
              <div className="flex justify-center space-x-6">
                <button className="w-12 h-12 rounded-full border-2 border-blue-300 flex items-center justify-center text-blue-200 hover:bg-blue-600 hover:text-white transition duration-200 transform hover:scale-110">
                  <FaGoogle size={20} />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-blue-300 flex items-center justify-center text-blue-200 hover:bg-blue-600 hover:text-white transition duration-200 transform hover:scale-110">
                  <FaFacebook size={20} />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-blue-300 flex items-center justify-center text-blue-200 hover:bg-blue-600 hover:text-white transition duration-200 transform hover:scale-110">
                  <FaApple size={20} />
                </button>
              </div>

              {/* Register link */}
              <div className="text-center mt-8">
                <span className="text-blue-200 text-sm">Don't have an account? </span>
                <a href="/register" className="text-white hover:underline font-medium transition-colors">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
