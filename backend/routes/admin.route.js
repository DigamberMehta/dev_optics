
import express from 'express';
import { Orders, Users, OrderItems, Products } from '../models/index.js'; 
import authenticateToken from '../middleware/auth.js'; 
import isAdmin from '../middleware/admin.js';       

const router = express.Router();



router.get('/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await Orders.findAll({
      
      order: [['created_at', 'DESC']],
      
      include: [
        {
          model: Users,
          
          attributes: ['user_id', 'name', 'email']
        },
        {
          model: OrderItems,
          as: 'orderItems', 
          include: [
            {
              model: Products,
              as: 'product', 
              
              attributes: ['product_id', 'name', 'price'] 
            }
          ]
        }
      ]
    });

    res.status(200).json(orders);

  } catch (error) {
    console.error('Admin fetch orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});



export default router;