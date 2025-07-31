import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../common/customer/Navbar";
import Footer from "../common/customer/Footer";
import SneakerCard from "../common/customer/SneakerCard";

const Sneakers = () => {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/shoes");
        setSneakers(res.data);
      } catch (err) {
        setError("Failed to load sneakers. Please try again later.");
        console.error("Error fetching sneakers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSneakers();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-800">Loading sneakers...</p>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <p className="text-center text-red-600 py-10">{error}</p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              Explore Our Sneaker Collection
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the latest trends in footwear with our premium collection of sneakers. 
              From classic designs to cutting-edge technology, find your perfect pair.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sneakers.map((sneaker) => (
              <SneakerCard key={sneaker._id} sneakerData={sneaker} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sneakers; 