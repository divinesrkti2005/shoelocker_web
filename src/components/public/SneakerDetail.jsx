import axios from "axios";
import React, { lazy, useEffect, useState } from "react";
import { FaHeart, FaTag } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";

const SneakerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sneakerData, setSneakerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0); // Wishlist count state
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSneakerDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/shoes/${id}`);
        setSneakerData(res.data);
      } catch (err) {
        setError("Failed to load sneaker details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlistData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const isInWishlist = res.data.wishlist.sneakers.some((sneaker) => sneaker._id === id);
        setIsFavorite(isInWishlist);
        setWishlistCount(res.data.wishlist.sneakers.length); // Set count dynamically
      } catch (err) {
        console.error("Error fetching wishlist", err);
      }
    };

    fetchSneakerDetails();
    if (token) fetchWishlistData();
  }, [id, token]);

  const handleWishlistToggle = async () => {
    if (!token) {
      alert("Please log in to add to wishlist.");
      return;
    }

    try {
      if (isFavorite) {
        // Remove from wishlist
        const res = await axios.delete(`http://localhost:3000/api/v1/wishlist/remove/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(false);
        setWishlistCount(res.data.count); // Update count from response
      } else {
        // Add to wishlist
        const res = await axios.post(
          `http://localhost:3000/api/v1/wishlist/add`,
          { sneakerId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFavorite(true);
        setWishlistCount(res.data.count); // Update count from response
      }
    } catch (err) {
      console.error("Error updating wishlist", err);
    }
  };

  if (loading) return <p className="text-center py-10 text-lg">Loading sneaker details...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <>
      <Navbar wishlistCount={wishlistCount} /> {/* Pass count to Navbar if needed */}
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
          <img
            src={`http://localhost:3000/uploads/${sneakerData.image}`}
            alt={sneakerData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 flex items-center justify-center">
            <h1 className="text-white text-5xl font-bold shadow-lg">{sneakerData.name}</h1>
          </div>
        </div>

        {/* Sneaker Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {/* Left Side - Features */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ Featured</h3>
            <p className="text-gray-700 text-lg">{sneakerData.featured ? 'Yes' : 'No'}</p>
          </div>

          {/* Right Side - Sneaker Details */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{sneakerData.name}</h2>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">{sneakerData.description}</p>

            <div className="mt-6 space-y-4">
              <p className="flex items-center text-gray-800 text-lg">
                 <span className="font-semibold">Colors: {sneakerData.colors.join(', ')}</span>
              </p>
              <p className="flex items-center text-gray-800 text-lg">
                 <span className="font-semibold">Material: {sneakerData.material}</span>
              </p>
              <p className="flex items-center text-gray-800 text-lg">
                 <span className="font-semibold">Condition: {sneakerData.condition}</span>
              </p>
              <p className="flex items-center text-gray-800 text-lg">
                <FaTag className="mr-3 text-red-700" /> <span className="font-semibold text-xl">Rs.{sneakerData.price}</span>
              </p>

              {/* Available Sizes Section */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                   Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sneakerData.availableSizes.length > 0 ? (
                    sneakerData.availableSizes.map((item, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                        {item.size} (Qty: {item.quantity})
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">No available sizes</p>
                  )}
                </div>
              </div>
            </div>

            {/* Booking & Favorite Section */}
            <div className="mt-10 flex justify-between items-center">
              {/* Favorite Button */}
              <button 
                onClick={handleWishlistToggle} 
                className="flex items-center text-lg font-semibold text-gray-800 transition duration-300"
              >
                <FaHeart className={`mr-2 text-2xl ${isFavorite ? "text-red-600" : "text-gray-400"}`} />
                {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>

              {/* Booking Button */}
              <button
                onClick={() => navigate(`/checkout/${sneakerData._id}`)}
                className="bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:bg-red-800 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SneakerDetail;

