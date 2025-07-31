import React from "react";
import { FaCheck, FaTrash, FaStar, FaEye } from "react-icons/fa";

const Reviews = () => {
  // Mock Data (Replace with actual API fetch)
  const reviews = [
    { 
      id: 1, 
      customer: "John Doe", 
      product: "Nike Air Max 270", 
      rating: 5, 
      review: "Amazing comfort and style! These shoes are perfect for daily wear. Great quality and the fit is exactly as expected.", 
      status: "Approved",
      date: "2024-02-15",
      productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop&crop=center"
    },
    { 
      id: 2, 
      customer: "Jane Smith", 
      product: "Adidas Ultraboost 22", 
      rating: 4, 
      review: "Beautiful design and very comfortable for running. The only minor issue is the sizing runs a bit small.", 
      status: "Pending",
      date: "2024-02-14",
      productImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=60&h=60&fit=crop&crop=center"
    },
    { 
      id: 3, 
      customer: "Michael Lee", 
      product: "Jordan Air 1 Retro", 
      rating: 5, 
      review: "Classic design that never goes out of style. Perfect fit and excellent quality. Highly recommend!", 
      status: "Approved",
      date: "2024-02-13",
      productImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=60&h=60&fit=crop&crop=center"
    },
    { 
      id: 4, 
      customer: "Sarah Wilson", 
      product: "Converse Chuck Taylor", 
      rating: 3, 
      review: "Good classic sneakers, but the canvas material feels a bit stiff initially. Takes time to break in.", 
      status: "Approved",
      date: "2024-02-12",
      productImage: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=60&h=60&fit=crop&crop=center"
    },
  ];

  const handleApproveReview = (reviewId) => {
    alert(`Review ${reviewId} approved successfully!`);
  };

  const handleRejectReview = (reviewId) => {
    alert(`Review ${reviewId} rejected!`);
  };

  const handleViewReview = (reviewId) => {
    alert(`Viewing full review ${reviewId}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        size={16}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-2">Customer Reviews</h2>
        <p className="text-gray-600">Manage and moderate customer reviews for your sneaker products</p>
      </div>

      {/* Reviews Table */}
      <div className="bg-white shadow-lg rounded-xl border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Review</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={review.productImage} 
                        alt={review.product} 
                        className="w-12 h-12 object-cover rounded-lg shadow-sm" 
                      />
                      <div className="font-medium text-blue-600">{review.product}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{review.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm font-semibold text-gray-600">({review.rating}/5)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-gray-700 text-sm line-clamp-2">{review.review}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{review.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        review.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewReview(review.id)}
                        className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm font-semibold"
                      >
                        <FaEye size={12} />
                        View
                      </button>
                      {review.status === "Pending" ? (
                        <button
                          onClick={() => handleApproveReview(review.id)}
                          className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-sm font-semibold"
                        >
                          <FaCheck size={12} />
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRejectReview(review.id)}
                          className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 text-sm font-semibold"
                        >
                          <FaTrash size={12} />
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {reviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-lg font-semibold text-gray-500">No reviews found</p>
            <p className="text-sm text-gray-400">Customer reviews will appear here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
