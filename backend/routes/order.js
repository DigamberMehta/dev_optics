// In your orders route file (e.g., routes/orders.js)
import express from 'express';
const router = express.Router();
import { Orders, OrderItems, Carts, CartItems, Products, Users, CustomizationPrice } from '../models/index.js'; // Make sure CustomizationPrice is imported

// Simplified authentication function within the route file
const isAuthenticated = async (req, res, next) => {
  const userId = req.body.userId || req.query.userId; // Check for userId in body or query

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID not provided.' });
  }

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid User ID.' });
    }
    req.user = user; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error during authentication.' });
  }
};

// Route to create a new order from the user's cart
router.post('/create', isAuthenticated, async (req, res) => {
  const userId = req.user.user_id; // User information is now available in req.user
  const { shippingAddress } = req.body; // Get shipping address from request body

  try {
    const cart = await Carts.findOne({ where: { user_id: userId } });
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found for this user.' });
    }

    const cartItems = await CartItems.findAll({
      where: { cart_id: cart.cart_id },
      include: [{
        model: Products,
        as: 'product', // Use the alias 'product' here
      }],
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0);

    const order = await Orders.create({
      user_id: userId,
      total_amount: totalAmount,
      status: 'pending',
      shipping_state: shippingAddress?.state,
      shipping_street: shippingAddress?.street,
      shipping_pincode: shippingAddress?.pincode,
      shipping_district: shippingAddress?.district,
      shipping_locality: shippingAddress?.locality,
      shipping_houseNumber: shippingAddress?.houseNumber,
      shipping_buildingName: shippingAddress?.buildingName,
      // Add other order details from req.body if necessary
    });

    for (const cartItem of cartItems) {
      await OrderItems.create({
        order_id: order.order_id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        total_price: cartItem.total_price, // Use the total price from the cart item
        customizations: cartItem.customizations,
        product_name_at_purchase: cartItem.product.name, // Access product name using the alias
      });
    }

    await CartItems.destroy({
      where: { cart_id: cart.cart_id },
    });

    res.status(201).json({ message: 'Order created successfully.', orderId: order.order_id });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order.', error: error.message });
  }
});

// Route to create an order for a "buy now" product with optional customization
router.post('/create-buy-now', isAuthenticated, async (req, res) => {
  const { productId, quantity = 1, customizations, shippingAddress } = req.body; // Get shipping address from request body
  const userId = req.user.user_id;

  try {
    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let totalPrice = parseFloat(product.price);
    // Removed customizationPrice calculation here

    const order = await Orders.create({
      user_id: userId,
      total_amount: totalPrice * quantity,
      status: 'pending',
      shipping_state: shippingAddress?.state,
      shipping_street: shippingAddress?.street,
      shipping_pincode: shippingAddress?.pincode,
      shipping_district: shippingAddress?.district,
      shipping_locality: shippingAddress?.locality,
      shipping_houseNumber: shippingAddress?.houseNumber,
      shipping_buildingName: shippingAddress?.buildingName,
      // Add other order details as needed
    });

    await OrderItems.create({
      order_id: order.order_id,
      product_id: productId,
      quantity: quantity,
      total_price: totalPrice * quantity, // Use the calculated total price
      customizations: customizations,
      product_name_at_purchase: product.name,
    });

    res.status(201).json({ message: 'Order created successfully.', orderId: order.order_id });

  } catch (error) {
    console.error('Error creating buy now order:', error);
    res.status(500).json({ message: 'Failed to create order.', error: error.message });
  }
});

 
router.get('/user-orders', isAuthenticated, async (req, res) => {
    const userId = req.user.user_id;
  
    try {
      const orders = await Orders.findAll({
        where: { user_id: userId },
        order: [['order_date', 'DESC']],
        include: [{
          model: OrderItems,
          as: 'orderItems', // Alias for the association
          include: [{
            model: Products,
            as: 'product', // Alias for the product within order item
            attributes: ['product_id', 'name', 'price', 'description', 'images'], // Include the images attribute
          }],
        }],
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching user orders with details and images:', error);
      res.status(500).json({ message: 'Failed to fetch user orders with details and images.', error: error.message });
    }
  });
  
  
 
export default router;