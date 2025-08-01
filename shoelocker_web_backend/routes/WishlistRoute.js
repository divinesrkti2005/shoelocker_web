const express = require("express");
const { addToWishlist, removeFromWishlist, getWishlist,getWishlistCount,deleteWishlistItem } = require("../controllers/WishlistController");
const { protect } = require("../middleware/auth"); // Middleware for authentication

const router = express.Router();

router.post("/add", protect, addToWishlist);
router.delete("/remove/:sneakerId", protect, removeFromWishlist);
router.get("/", protect, getWishlist);
router.get("/count", protect, getWishlistCount); // New route to get wishlist count
router.delete("/delete/:sneakerId", protect, deleteWishlistItem);


module.exports = router;
