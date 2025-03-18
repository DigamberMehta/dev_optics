import express from 'express';
const router = express.Router();
import { Products, CustomizationPrice, Carts, CartItems } from '../models/index.js';

// Route to add a complete product to the cart
router.post('/add', async (req, res) => {
  const { productId, userId } = req.body; // Assuming userId is passed in the request

  if (!userId) {
    return res.status(401).json({ message: 'User authentication required.' });
  }

  try {
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Find or create the user's cart
    const [cart, created] = await Carts.findOrCreate({
      where: { user_id: userId },
    });

    // Create a new cart item
    const newCartItem = await CartItems.create({
      cart_id: cart.cart_id,
      product_id: product.product_id,
      quantity: 1,
      base_price: product.price,
      total_price: product.price, // For complete products, base price and total price are the same
      customization_price: 0, // No customization for complete products
      customizations: null, // No customizations
    });

    return res.status(201).json({
      message: 'Complete product added to cart successfully.',
      cartItem: newCartItem,
    });

  } catch (error) {
    console.error('Error processing add to cart request:', error);
    return res.status(500).json({ message: 'Could not process add to cart request.', error: error.message });
  }
});

// Route to add a custom frame to the cart
router.post('/add-custom-frame', async (req, res) => {
  const { productId, lensOptions, userId } = req.body; // Assuming userId is passed in the request

  if (!userId) {
    return res.status(401).json({ message: 'User authentication required.' });
  }

  try {
    const frame = await Products.findByPk(productId);

    if (!frame || frame.product_type !== 'frame' || frame.lens_id !== null) {
      return res.status(400).json({ message: 'Invalid product for customization.' });
    }

    let totalPrice = parseFloat(frame.price); // Ensure numeric price
    let customizationPrice = 0;
    const missingAttributes = [];

    const adjustments = [
      lensOptions.lens_type && { attribute_name: 'lens_type', attribute_value: lensOptions.lens_type },
      lensOptions.material && { attribute_name: 'material', attribute_value: lensOptions.material },
      lensOptions.has_anti_reflective_coating && { attribute_name: 'has_anti_reflective_coating', attribute_value: 'true' },
      lensOptions.has_uv_protection && { attribute_name: 'has_uv_protection', attribute_value: 'true' },
      lensOptions.is_polarized && { attribute_name: 'is_polarized', attribute_value: 'true' },
      lensOptions.has_blue_light_filter && { attribute_name: 'has_blue_light_filter', attribute_value: 'true' },
      lensOptions.is_tinted && { attribute_name: 'is_tinted', attribute_value: 'true' },
      lensOptions.is_tinted && lensOptions.tint_color && lensOptions.tint_color !== 'none' && { attribute_name: 'tint_color', attribute_value: lensOptions.tint_color }
    ].filter(Boolean);

    for (const adjustment of adjustments) {
      const price = await CustomizationPrice.findOne({ where: adjustment });

      if (price) {
        customizationPrice += parseFloat(price.price_adjustment); // Ensure numeric value
      } else {
        missingAttributes.push(adjustment);
      }
    }

    totalPrice += customizationPrice;

    // Find or create the user's cart
    const [cart, created] = await Carts.findOrCreate({
      where: { user_id: userId },
    });

    // Create a new cart item
    const newCartItem = await CartItems.create({
      cart_id: cart.cart_id,
      product_id: productId,
      quantity: 1,
      base_price: frame.price,
      customization_price: customizationPrice,
      total_price: totalPrice,
      customizations: lensOptions,
    });

    return res.status(201).json({
      message: 'Custom frame added to cart successfully.',
      cartItem: newCartItem,
      missingAttributes,
      totalPrice
    });

  } catch (error) {
    console.error('Error in add-custom-frame:', error);
    return res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

export default router;