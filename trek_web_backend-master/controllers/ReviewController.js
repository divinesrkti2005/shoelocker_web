const Review = require('../models/Review');
const findAll = async (req, res) => {
    try {
        const reviews = await Review.find().populate(["customerId", "sneakerId"]);
        res.status(200).json(reviews);
    } catch (e) {
        res.json(e)
    }

}
const save = async (req, res) => {
    try {
        // Get customer ID from the authenticated user
        const customerId = req.user.id;
        
        const reviewData = {
            ...req.body,
            customerId: customerId
        };
        
        const reviews = new Review(reviewData);
        await reviews.save();
        
        // Populate the saved review with customer and sneaker details
        const populatedReview = await Review.findById(reviews._id).populate(["customerId", "sneakerId"]);
        res.status(201).json(populatedReview)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}
const findById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json(review)
    } catch (e) {
        res.json(e)

    }


}
const deleteById = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        res.status(200).json("data Deleted")
    } catch (e) {
        res.json(e)

    }


}
const update = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(review)
    } catch (e) {
        res.json(e)

    }


}

module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update

}