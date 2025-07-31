const Booking = require("../models/Booking");
const Shoe = require("../models/Shoe");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { sneakerId, quantity, size, color, address, phone, paymentMethod, totalAmount } = req.body;
    const customerId = req.user.id; // Get customer ID from authenticated user

    // Check if sneaker exists
    const sneaker = await Shoe.findById(sneakerId);
    if (!sneaker) {
      return res.status(404).json({ error: "Sneaker not found" });
    }

    // Create the booking with all order details
    const bookingData = {
      sneakerId,
      customerId,
      quantity,
      size,
      color,
      address,
      phone,
      paymentMethod,
      totalAmount,
      status: "pending",
      createdAt: new Date()
    };

    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();

    // Populate the saved booking with sneaker details
    const populatedBooking = await Booking.findById(savedBooking._id).populate("sneakerId");
    
    res.status(201).json({ 
      message: "Order placed successfully!", 
      booking: populatedBooking 
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all bookings (for admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate(["sneakerId", "customerId"]);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Get bookings for the authenticated user
const getUserBookings = async (req, res) => {
  try {
    const customerId = req.user.id;
    const bookings = await Booking.find({ customerId }).populate("sneakerId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(["sneakerId", "customerId"]);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

// Update booking status (for admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate(["sneakerId", "customerId"]);
    
    if (!updatedBooking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking status updated", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking status" });
  }
};

// Cancel a booking (for user)
const cancelBooking = async (req, res) => {
  try {
    const customerId = req.user.id;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (booking.customerId.toString() !== customerId) {
      return res.status(403).json({ error: "Not authorized to cancel this booking" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    ).populate("sneakerId");
    
    res.status(200).json({ message: "Order cancelled", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};
