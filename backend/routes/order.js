// In your orders route file (e.g., routes/orders.js)
import express from 'express';
const router = express.Router();
import { Orders, OrderItems, Carts, CartItems, Products, Users, CustomizationPrice } from '../models/index.js'; // Make sure CustomizationPrice is
import { Cashfree } from 'cashfree-pg';
// Configure Cashfree credentials (FOR TESTING ONLY - DO NOT HARDCODE IN PRODUCTION)
const CASHFREE_CLIENT_ID = 'TEST10268416efeb71e774ef5059c76161486201'; // Replace with your actual Client ID
const CASHFREE_CLIENT_SECRET = 'cfsk_ma_test_6ce1298b1588d02d7fb9122085566093_912fa9e7'; // Replace with your actual Secret Key
Cashfree.XClientId = CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = process.env.NODE_ENV === 'production' ? Cashfree.Environment.PRODUCTION : Cashfree.Environment.SANDBOX;

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


router.post('/create-cashfree-order', isAuthenticated, async (req, res) => {
  try {
    const { totalAmount, shippingAddress } = req.body; // Receive shippingAddress
    const userId = req.user.user_id;

    // Find the user's cart
    const cart = await Carts.findOne({ where: { user_id: userId } });
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found for this user.' });
    }

    // Find all items in the user's cart
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

    // Create a new order in your database
    const order = await Orders.create({
      user_id: userId,
      total_amount: totalAmount,
      status: 'pending', // Initial status
      shipping_state: shippingAddress?.state,
      shipping_street: shippingAddress?.street,
      shipping_pincode: shippingAddress?.pincode,
      shipping_district: shippingAddress?.district,
      shipping_locality: shippingAddress?.locality,
      shipping_houseNumber: shippingAddress?.houseNumber,
      shipping_buildingName: shippingAddress?.buildingName,
      // Add other relevant order details here if needed
    });

    // Create order items from the cart items
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

    const cfOrderId = `CF_ORDER_${order.order_id}`; // Create a unique Cashfree order ID

    const request = {
      "order_id": cfOrderId,
      "order_amount": totalAmount.toString(),
      "order_currency": "INR",
      "customer_details": {
        "customer_id": userId.toString(),
        "customer_name": req.user.name || '', // Assuming 'name' is in your User model
        "customer_email": req.user.email || '',
        "customer_phone": req.user.phone || '' // Assuming 'phone' is in your User model
      },
      "order_meta": {
        "return_url": `${req.headers.origin}/order-status/${order.order_id}?cf_order_id={order_id}&token={token}`
      },
      "order_note": `Order ID: ${order.order_id}`
    };

    Cashfree.PGCreateOrder("2025-01-01", request)
      .then((response) => {
        // Optionally, you can update your Orders table with the Cashfree order ID
        Orders.update({ transaction_id: cfOrderId }, { where: { order_id: order.order_id } });
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error('Error creating Cashfree order:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to create Cashfree order.', error: error.response ? error.response.data : error.message });
      });

  } catch (error) {
    console.error('Error in /create-cashfree-order:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

// Route to verify Cashfree payment (no changes needed here unless you want to fetch order by transaction_id)
router.post('/verify-cashfree-payment', async (req, res) => {
  try {
    const { orderId, cfOrderId } = req.body;
    const version = "2023-08-01";

    Cashfree.PGFetchOrder(version, cfOrderId)
      .then((response) => {
        console.log('Order fetched successfully:', response.data);
        const orderData = response.data;

        let paymentStatus = 'unpaid';
        // let paymentMethod = null; // Payment method not directly available in this response

        if (orderData && orderData.order_status === 'PAID') {
          paymentStatus = 'paid';
          // You might need a different API call or webhook to get the payment method
        } else if (orderData && orderData.order_status === 'FAILED') {
          paymentStatus = 'unpaid'; // Or set to 'failed'
        }

        const updateData = {
          payment_status: paymentStatus,
          transaction_id: cfOrderId,
        };
        // if (paymentMethod) { // Commenting out for now as it's not available
        //   updateData.payment_method = paymentMethod;
        // }

        Orders.update(updateData, { where: { order_id: orderId } });
        res.status(200).json({ paymentStatus: paymentStatus === 'paid' ? 'SUCCESS' : 'FAILED', message: 'Payment verification complete.', data: orderData });
      })
      .catch((error) => {
        console.error('Error fetching order:', error.response ? error.response.data : error.message);
        res.status(500).json({ paymentStatus: 'ERROR', message: 'Failed to verify payment.', error: error.response ? error.response.data : error.message });
      });

  } catch (error) {
    console.error('Error in /verify-cashfree-payment:', error);
    res.status(500).json({ paymentStatus: 'ERROR', message: 'Internal server error.', error: error.message });
  }
});
// Route to create an order for a "buy now" product with Cashfree payment
router.post('/create-cashfree-buy-now-order', isAuthenticated, async (req, res) => {
  const { productId, quantity = 1, customizations, shippingAddress } = req.body; // Get shipping address from request body
  const userId = req.user.user_id;

  try {
    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const totalPrice = parseFloat(product.price) * quantity;

    const order = await Orders.create({
      user_id: userId,
      total_amount: totalPrice,
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
      total_price: totalPrice, // Use the calculated total price
      customizations: customizations,
      product_name_at_purchase: product.name,
    });

    const cfOrderId = `CF_ORDER_${order.order_id}`; // Create a unique Cashfree order ID

    const request = {
      "order_id": cfOrderId,
      "order_amount": totalPrice.toString(),
      "order_currency": "INR",
      "customer_details": {
        "customer_id": userId.toString(),
        "customer_name": req.user.name || '', // Assuming 'name' is in your User model
        "customer_email": req.user.email || '',
        "customer_phone": req.user.phone || '' // Assuming 'phone' is in your User model
      },
      "order_meta": {
        "return_url": `${req.headers.origin}/order-status/${order.order_id}?cf_order_id={order_id}&token={token}`
      },
      "order_note": `Order ID: ${order.order_id}`
    };

    Cashfree.PGCreateOrder("2025-01-01", request)
      .then((response) => {
        // Optionally, you can update your Orders table with the Cashfree order ID
        Orders.update({ transaction_id: cfOrderId }, { where: { order_id: order.order_id } });
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error('Error creating Cashfree order:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to create Cashfree order.', error: error.response ? error.response.data : error.message });
      });

  } catch (error) {
    console.error('Error creating buy now order with Cashfree:', error);
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