import React from "react";
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import heroImage from "/src/assets/images/hero.jpg";
import contactImage from "/src/assets/images/contact.jpg";
import packagesImage from "/src/assets/images/packages.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Step Into Style
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-3xl text-blue-100">
          Discover the latest sneaker collection with premium quality and futuristic designs.
        </p>
        <div className="mt-8">
          <button onClick={() => navigate("/packages")} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-8 text-xl rounded-lg hover:from-blue-700 hover:to-cyan-600 transition duration-300 shadow-lg">
            Explore Sneakers
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, description, buttonText, image, imagePosition = "left", onButtonClick }) => (
  <div className={`flex flex-col md:flex-row items-center justify-between py-12 ${imagePosition === "right" ? "md:flex-row-reverse" : ""}`}>
    <div className="md:w-1/2 p-6">
      <h2 className="text-4xl font-bold mb-4 text-blue-800">{title}</h2>
      <p className="text-lg text-gray-700 mb-6">{description}</p>
      <button onClick={onButtonClick} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-8 text-xl rounded-lg hover:from-blue-700 hover:to-cyan-600 transition duration-300 shadow-lg">
        {buttonText}
      </button>
    </div>
    <div className="md:w-1/2">
      <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
    </div>
  </div>
);

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection />

      <div className="container mx-auto px-6">
        <Section
          title="Premium Sneaker Collection"
          description="From classic designs to cutting-edge technology, we have the perfect sneakers for every style and occasion."
          buttonText="View All Sneakers"
          image={packagesImage}
          onButtonClick={() => navigate("/packages")}
        />
        <Section
          title="Custom Sneaker Orders"
          description="Looking for something specific? Contact us for custom sneaker orders and personalized recommendations."
          buttonText="Get in Touch"
          image={contactImage}
          imagePosition="right"
          onButtonClick={() => navigate("/contact")}
        />
      </div>
    </div>
  );
};

export default Hero;