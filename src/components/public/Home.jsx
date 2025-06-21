import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Footer from "../../components/common/customer/Footer";
import Hero from "../../components/common/customer/Hero";
import Navbar from "../../components/common/customer/Navbar";
import PackageCard from "../common/customer/PackageCard";

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const sneakersRef = useRef(null);

  // Show scroll-to-top after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch sneakers
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/package")
      .then((res) => setSneakers(res.data))
      .catch((err) => console.error("Error fetching sneakers:", err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSneakers = () => {
    sneakersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar scrollToSneakers={scrollToSneakers} />
      <Hero />

      {/* Sneakers Section */}
      <div ref={sneakersRef} className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
          Explore Our Sneaker Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sneakers.map((sneaker) => (
            <PackageCard key={sneaker._id} packageData={sneaker} />
          ))}
        </div>
      </div>

      <Footer />

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition duration-300 cursor-pointer"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default Home;
