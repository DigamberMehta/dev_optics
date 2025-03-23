import express from 'express';
const router = express.Router();
import { Orders, OrderItems, Carts, CartItems, Products, Users } from '../models/index.js';
import { Cashfree } from 'cashfree-pg';

// Configure Cashfree credentials (FOR TESTING ONLY - DO NOT HARDCODE IN PRODUCTION)
const CASHFREE_CLIENT_ID = 'TEST10268416efeb71e774ef5059c76161486201';
const CASHFREE_CLIENT_SECRET = 'cfsk_ma_test_6ce1298b1588d02d7fb9122085566093_912fa9e7';
Cashfree.XClientId = CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = process.env.NODE_ENV === 'production' ? Cashfree.Environment.PRODUCTION : Cashfree.Environment.SANDBOX;

// Simplified authentication function
const isAuthenticated = async (req, res, next) => {
  const userId = req.body.userId || req.query.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID not provided.' });
  }
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid User ID.' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error during authentication.' });
  }
};

// Helper function to create a new order record
const createOrderRecord = async (userId, totalAmount, shippingAddress) => {
  return Orders.create({
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
  });
};

// Helper function to create order items
const createOrderItems = async (orderId, items) => {
  return Promise.all(items.map(async (item) => {
    const product = await Products.findByPk(item.product_id);
    return OrderItems.create({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      total_price: item.total_price,
      customizations: item.customizations,
      product_name_at_purchase: product?.name || 'Product Name Not Found',
    });
  }));
};

// Route to create a new order from the user's cart
router.post('/create', isAuthenticated, async (req, res) => {
  const userId = req.user.user_id;
  const { shippingAddress } = req.body;

  try {
    const cart = await Carts.findOne({ where: { user_id: userId } });
    if (!cart) return res.status(400).json({ message: 'Cart not found for this user.' });

    const cartItems = await CartItems.findAll({
      where: { cart_id: cart.cart_id },
      include: [{ model: Products, as: 'product' }],
    });
    if (!cartItems || cartItems.length === 0) return res.status(400).json({ message: 'Your cart is empty.' });

    const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0);

    const order = await createOrderRecord(userId, totalAmount, shippingAddress);

    const orderItemData = cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      total_price: item.total_price,
      customizations: item.customizations,
    }));
    await createOrderItems(order.order_id, orderItemData);

    await CartItems.destroy({ where: { cart_id: cart.cart_id } });

    res.status(201).json({ message: 'Order created successfully.', orderId: order.order_id });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order.', error: error.message });
  }
});

// Route to create an order for a "buy now" product
router.post('/create-buy-now', isAuthenticated, async (req, res) => {
  const { productId, quantity = 1, customizations, shippingAddress } = req.body;
  const userId = req.user.user_id;

  try {
    const product = await Products.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const totalPrice = parseFloat(product.price) * quantity;

    const order = await createOrderRecord(userId, totalPrice, shippingAddress);

    await createOrderItems(order.order_id, [{
      product_id: productId,
      quantity: quantity,
      total_price: totalPrice,
      customizations: customizations,
    }]);

    res.status(201).json({ message: 'Order created successfully.', orderId: order.order_id });

  } catch (error) {
    console.error('Error creating buy now order:', error);
    res.status(500).json({ message: 'Failed to create order.', error: error.message });
  }
});

const handleCashfreeOrderCreation = async (req, res, isBuyNow = false) => {
  try {
    const { totalAmount, shippingAddress, productId, quantity = 1, customizations } = req.body;
    const userId = req.user.user_id;
    let order;
    let cfOrderId;

    if (!isBuyNow) {
      const cart = await Carts.findOne({ where: { user_id: userId } });
      if (!cart) return res.status(400).json({ message: 'Cart not found for this user.' });
      const cartItems = await CartItems.findAll({
        where: { cart_id: cart.cart_id },
        include: [{ model: Products, as: 'product' }],
      });
      if (!cartItems || cartItems.length === 0) return res.status(400).json({ message: 'Your cart is empty.' });

      order = await createOrderRecord(userId, totalAmount, shippingAddress);
      const orderItemData = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        total_price: item.total_price,
        customizations: item.customizations,
      }));
      await createOrderItems(order.order_id, orderItemData);
      cfOrderId = `CF_ORDER_${order.order_id}`;
    } else {
      const product = await Products.findByPk(productId);
      if (!product) return res.status(404).json({ message: 'Product not found.' });
      const totalPrice = parseFloat(product.price) * quantity;
      order = await createOrderRecord(userId, totalPrice, shippingAddress);
      await createOrderItems(order.order_id, [{
        product_id: productId,
        quantity: quantity,
        total_price: totalPrice,
        customizations: customizations,
      }]);
      cfOrderId = `CF_ORDER_${order.order_id}`;
    }

    const request = {
      "order_id": cfOrderId,
      "order_amount": totalAmount.toString(),
      "order_currency": "INR",
      "customer_details": {
        "customer_id": userId.toString(),
        "customer_name": req.user.name || '',
        "customer_email": req.user.email || '',
        "customer_phone": req.user.phone || ''
      },
      "order_meta": {
        "return_url": `${req.headers.origin}/order-status/${order.order_id}?cf_order_id={order_id}&token={token}`
      },
      "order_note": `Order ID: ${order.order_id}`
    };

    Cashfree.PGCreateOrder("2025-01-01", request)
      .then((response) => {
        Orders.update({ transaction_id: cfOrderId }, { where: { order_id: order.order_id } });
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error('Error creating Cashfree order:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to create Cashfree order.', error: error.response ? error.response.data : error.message });
      });

  } catch (error) {
    console.error('Error in Cashfree order creation:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

router.post('/create-cashfree-order', isAuthenticated, async (req, res) => {
  await handleCashfreeOrderCreation(req, res);
});

router.post('/create-cashfree-buy-now-order', isAuthenticated, async (req, res) => {
  await handleCashfreeOrderCreation(req, res, true);
});

// Route to verify Cashfree payment (no changes needed here)
router.post('/verify-cashfree-payment', async (req, res) => {
  try {
    const { orderId, cfOrderId } = req.body;
    const version = "2023-08-01";

    Cashfree.PGFetchOrder(version, cfOrderId)
      .then((response) => {
        console.log('Order fetched successfully:', response.data);
        const orderData = response.data;

        let paymentStatus = 'unpaid';

        if (orderData && orderData.order_status === 'PAID') {
          paymentStatus = 'paid';
        } else if (orderData && orderData.order_status === 'FAILED') {
          paymentStatus = 'unpaid';
        }

        const updateData = {
          payment_status: paymentStatus,
          transaction_id: cfOrderId,
        };

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

router.get('/user-orders', isAuthenticated, async (req, res) => {
  const userId = req.user.user_id;

  try {
    const orders = await Orders.findAll({
      where: { user_id: userId },
      order: [['order_date', 'DESC']],
      include: [{
        model: OrderItems,
        as: 'orderItems',
        include: [{
          model: Products,
          as: 'product',
          attributes: ['product_id', 'name', 'price', 'description', 'images'],
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