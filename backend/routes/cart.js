import express from 'express';
const router = express.Router();
import { Products, CustomizationPrice, Carts, CartItems } from '../models/index.js';
import { Op } from 'sequelize'; // Import Sequelize Operators

// Middleware to check for user authentication
const isAuthenticated = (req, res, next) => {
  if (req.method === 'GET' && req.query.userId) {
    return next();
  }
  if (req.method === 'POST' && req.body.userId) {
    return next();
  }
  console.log('Authentication check failed:', req.query.userId || req.body.userId);
  return res.status(401).json({ message: 'User authentication required.' });
};

// Route to fetch user's cart items
router.get('/get-cart-items', isAuthenticated, async (req, res) => {
  const { userId } = req.query; // Get userId from query parameters

  try {
    const cart = await Carts.findOne({
      where: { user_id: userId },
    });

    if (!cart) {
      return res.status(200).json({ items:[], totalItems: 0 }); // Cart is empty
    }

    const cartItems = await CartItems.findAll({
      where: { cart_id: cart.cart_id },
      include: [
        {
          model: Products,
          as: 'product',
          attributes: ['product_id', 'name', 'price', 'images'], // Select necessary product attributes
        },
      ],
    });

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return res.status(200).json({ items: cartItems, totalItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Could not fetch cart items.', error: error.message });
  }
});

// Route to add a complete product to the cart
router.post('/add', isAuthenticated, async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const [cart] = await Carts.findOrCreate({
      where: { user_id: userId },
    });

    const existingCartItem = await CartItems.findOne({
      where: {
        cart_id: cart.cart_id,
        product_id: product.product_id,
        customizations: null, // Only for complete products
      },
    });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      existingCartItem.total_price = existingCartItem.base_price * existingCartItem.quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Product quantity updated in cart.', cartItem: existingCartItem });
    }

    const newCartItem = await CartItems.create({
      cart_id: cart.cart_id,
      product_id: product.product_id,
      quantity: 1,
      base_price: product.price,
      total_price: product.price,
      customization_price: 0,
      customizations: null,
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
router.post('/add-custom-frame', isAuthenticated, async (req, res) => {
  const { productId, lensOptions, userId } = req.body;

  try {
    const frame = await Products.findByPk(productId);

    if (!frame || frame.product_type !== 'frame' || frame.lens_id !== null) {
      return res.status(400).json({ message: 'Invalid product for customization.' });
    }

    let totalPrice = parseFloat(frame.price);
    let customizationPrice = 0;
    const missingAttributes =[];

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
        customizationPrice += parseFloat(price.price_adjustment);
      } else {
        missingAttributes.push(adjustment);
      }
    }

    totalPrice += customizationPrice;

    const [cart] = await Carts.findOrCreate({
      where: { user_id: userId },
    });

    const existingCartItem = await CartItems.findOne({
      where: {
        cart_id: cart.cart_id,
        product_id: productId,
        customizations: lensOptions, // Compare the object directly
      },
    });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      existingCartItem.total_price = existingCartItem.base_price + existingCartItem.customization_price * existingCartItem.quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Custom frame quantity updated in cart.', cartItem: existingCartItem });
    }

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

// Route to fetch user's cart items for checkout
router.get('/get-checkout-items', isAuthenticated, async (req, res) => {
  const { userId } = req.query; // Get userId from query parameters

  try {
    const cart = await Carts.findOne({
      where: { user_id: userId },
    });

    if (!cart) {
      return res.status(200).json({ items:[], totalItems: 0 }); // Cart is empty
    }

    const cartItems = await CartItems.findAll({
      where: { cart_id: cart.cart_id },
      include: [
        {
          model: Products,
          as: 'product',
          attributes: ['product_id', 'name', 'price', 'images'], // Select necessary product attributes
        },
      ],
    });

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return res.status(200).json({ items: cartItems, totalItems });
  } catch (error) {
    console.error('Error fetching cart items for checkout:', error);
    return res.status(500).json({ message: 'Could not fetch cart items for checkout.', error: error.message });
  }
});



export default router;

