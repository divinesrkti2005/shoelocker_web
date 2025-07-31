import React from "react";
import { Link } from "react-router-dom";

const SneakerCard = ({ sneakerData }) => {
  // Construct the correct image URL
  const imageUrl = `http://localhost:3000/uploads/${sneakerData.image}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
      <div className="relative">
        <img src={imageUrl} alt={sneakerData.name} className="w-full h-52 object-cover" />
        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {sneakerData.condition}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{sneakerData.name}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{sneakerData.description}</p>
        <div className="space-y-1 mb-4">
          <p className="text-gray-700 text-sm font-medium flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {sneakerData.brand}
          </p>
          <p className="text-gray-700 text-sm font-medium flex items-center">
            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
            {sneakerData.category}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-800 font-bold text-xl">₹{sneakerData.price}</span>
          <Link 
            to={`/sneakers/${sneakerData._id}`} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SneakerCard;
