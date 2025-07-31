import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Footer from "../../components/common/customer/Footer";
import Hero from "../../components/common/customer/Hero";
import Navbar from "../../components/common/customer/Navbar";
import SneakerCard from "../../components/common/customer/SneakerCard";

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [featuredSneakers, setFeaturedSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sneakersRef = useRef(null);

  // Handle Scroll Event
  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Featured Sneakers from API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/shoes")
      .then((res) => {
        // Get first 6 sneakers as featured
        setFeaturedSneakers(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching sneakers. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to Scroll to Sneakers Section
  const scrollToSneakers = () => {
    sneakersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar scrollToSneakers={scrollToSneakers} />
      <Hero />

      {/* Featured Sneakers Section */}
      <div ref={sneakersRef} className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Featured Sneakers
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading sneakers...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : featuredSneakers.length === 0 ? (
          <p className="text-center text-gray-600">No sneakers available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredSneakers.map((sneaker) => (
              <SneakerCard key={sneaker._id} sneakerData={sneaker} />
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300 cursor-pointer"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default Home;