const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    sneakerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shoes"
    },
    rating: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

})
const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;