const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  sneakerId: { type: mongoose.Schema.Types.ObjectId, ref: "Shoe", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: true },
  color: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { type: String, enum: ["cod", "online"], required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
