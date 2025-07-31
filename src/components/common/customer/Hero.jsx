import React from "react";
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=600&fit=crop&crop=center)` }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-cyan-700/60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Step Into
            </span>
            <br />
            <span className="text-white">Excellence</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Discover the latest sneaker trends with premium quality and futuristic designs. 
            From classic to cutting-edge, find your perfect pair.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/sneakers")} 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 px-8 text-xl rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg font-semibold transform hover:scale-105"
            >
              Shop Now
            </button>
            <button 
              onClick={() => navigate("/sneakers")} 
              className="bg-white/20 backdrop-blur-sm text-white py-4 px-8 text-xl rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 font-semibold"
            >
              View Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 text-center transform hover:scale-105 transition-all duration-300">
    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🎯"
              title="Premium Quality"
              description="Authentic sneakers from top brands with guaranteed quality"
            />
            <FeatureCard 
              icon="🚚"
              title="Fast Delivery"
              description="Quick and secure shipping to your doorstep"
            />
            <FeatureCard 
              icon="💎"
              title="Exclusive Collection"
              description="Curated selection of the latest and most sought-after sneakers"
            />
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular sneaker categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=300&fit=crop&crop=center" 
                alt="Running Shoes" 
                className="w-full h-64 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">Running Collection</h3>
                <p className="text-gray-600 mb-4">Performance sneakers for every runner, from beginners to professionals.</p>
                <button 
                  onClick={() => navigate("/sneakers")} 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
                >
                  Explore Running
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=300&fit=crop&crop=center" 
                alt="Lifestyle Shoes" 
                className="w-full h-64 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">Lifestyle Collection</h3>
                <p className="text-gray-600 mb-4">Stylish sneakers for everyday wear that combine comfort and fashion.</p>
                <button 
                  onClick={() => navigate("/sneakers")} 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
                >
                  Explore Lifestyle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;