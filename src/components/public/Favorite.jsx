import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3000/api/v1/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
    }
  };

  const removeFavorite = async (sneakerId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`http://localhost:3000/api/v1/wishlist/remove/${sneakerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from local state
      setFavorites(favorites.filter((fav) => fav._id !== sneakerId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-25 h-[500px]">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Favorite Sneakers ❤️</h1>

        {loading ? (
          <p className="text-center text-gray-800 text-lg">Loading favorites...</p>
        ) : favorites.length === 0 ? (
          <p className="text-center text-gray-800 text-lg">No favorite sneakers yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {favorites.map((sneaker) => (
              <div key={sneaker._id} className="bg-white shadow-lg rounded-lg flex items-center p-4">
                <img src={`http://localhost:3000/uploads/${sneaker.image}`} alt={sneaker.name} className="w-32 h-32 object-cover rounded-md" />
                <div className="ml-6 flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800">{sneaker.name}</h3>
                  <p className="text-gray-800 mt-1">{sneaker.description}</p>
                  <p className="text-lg font-semibold text-red-800 mt-2">₹{sneaker.price}</p>
                </div>
                <button
                  onClick={() => removeFavorite(sneaker._id)}
                  className="bg-red-800 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
    
  );
};

export default Favorite; 
