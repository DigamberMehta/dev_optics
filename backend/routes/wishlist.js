import express from 'express';
const router = express.Router();
import { Wishlists, Products } from '../models/index.js'; // Adjust the import path to your models

// Middleware to protect routes (example - you might have your own authentication middleware)
const requireLogin = (req, res, next) => {
  // Replace this with your actual authentication logic
  if (req.user) { // Assuming your auth middleware sets req.user
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// GET /api/wishlist - Fetch user's wishlist
router.get('/wishlist', requireLogin, async (req, res) => {
  try {
    const userId = req.query.userId; // Or req.user.user_id if using authentication middleware

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const wishlistItems = await Wishlists.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Products,
          as: 'product', // Make sure your association in models/index.js uses 'as: 'product''
        },
      ],
    });

    // Extract product data from the included model
    const productsInWishlist = wishlistItems.map(item => item.product);

    res.json(productsInWishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Failed to fetch wishlist.' });
  }
});

// POST /api/wishlist/add - Add a product to the wishlist
router.post('/wishlist/add', requireLogin, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.user_id; // Assuming user ID from authentication

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    const existingWishlistItem = await Wishlists.findOne({
      where: { user_id: userId, product_id: productId },
    });

    if (!existingWishlistItem) {
      await Wishlists.create({ user_id: userId, product_id: productId });
      res.status(201).json({ message: 'Product added to wishlist.' });
    } else {
      res.status(200).json({ message: 'Product is already in the wishlist.' });
    }
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Failed to add product to wishlist.' });
  }
});

// DELETE /api/wishlist/remove/:productId - Remove a product from the wishlist
router.delete('/wishlist/remove/:productId', requireLogin, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.user_id; // Assuming user ID from authentication

    const deletedRows = await Wishlists.destroy({
      where: { user_id: userId, product_id: productId },
    });

    if (deletedRows > 0) {
      res.json({ message: 'Product removed from wishlist.' });
    } else {
      res.status(404).json({ message: 'Product not found in wishlist.' });
    }
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Failed to remove product from wishlist.' });
  }
});

export default router;