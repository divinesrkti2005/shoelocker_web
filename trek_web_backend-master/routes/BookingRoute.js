const express = require("express")
const { protect } = require("../middleware/auth");
const { 
  cancelBooking, 
  createBooking, 
  getAllBookings, 
  getUserBookings,
  getBookingById, 
  updateBookingStatus 
} = require("../controllers/BookingController");

const router = express.Router();

// User routes (require authentication)
router.post("/", protect, createBooking); // Create booking
router.get("/", protect, getUserBookings); // Get user's bookings
router.put("/:id/cancel", protect, cancelBooking); // Cancel a booking

// Admin routes (require authentication)
router.get("/admin", protect, getAllBookings); // Get all bookings (admin)
router.get("/:id", protect, getBookingById); // Get a specific booking by ID
router.put("/:id/status", protect, updateBookingStatus); // Update booking status (admin)

module.exports = router;
