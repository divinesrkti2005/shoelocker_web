import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";
import Footer from "../common/customer/Footer";
import Navbar from "../common/customer/Navbar";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    sneakerId: "",
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    fetchReviews();
    fetchSneakers();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/reviews");
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  const fetchSneakers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/shoes");
      setSneakers(response.data);
    } catch (error) {
      console.error("Error fetching sneakers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newReview.sneakerId || !newReview.rating || !newReview.comment) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to leave a review");
        return;
      }

      const reviewData = {
        sneakerId: newReview.sneakerId,
        rating: newReview.rating.toString(),
        comment: newReview.comment,
        date: new Date()
      };

      await axios.post("http://localhost:3000/api/v1/reviews", reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Review submitted successfully!");
      setNewReview({ sneakerId: "", rating: 0, comment: "" });
      fetchReviews(); // Refresh reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500 text-lg" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 text-lg" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400 text-lg" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Customer Reviews</h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          See what our customers say about our sneakers!
        </p>

        {/* Reviews Grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading reviews...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                    {review.customerId?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {review.customerId?.name || "Anonymous"}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {renderStars(parseFloat(review.rating))}
                  <span className="ml-2 text-gray-600">({review.rating} stars)</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                {review.sneakerId && (
                  <p className="text-blue-600 text-sm mt-2">
                    Review for: {review.sneakerId.name || "Sneaker"}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Review Form */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Sneaker</label>
              <select
                name="sneakerId"
                value={newReview.sneakerId}
                onChange={(e) => setNewReview({ ...newReview, sneakerId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a Sneaker</option>
                {sneakers.map((sneaker) => (
                  <option key={sneaker._id} value={sneaker._id}>
                    {sneaker.name} - {sneaker.brand}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Rating</label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a Rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Comment</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience with this sneaker..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
