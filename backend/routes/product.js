import express from 'express';
const router = express.Router();
import {Products, FrameMeasurements, Lens } from '../models/index.js';

router.get('/products', async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [
        {
          model: FrameMeasurements,
          as: 'frame',
          attributes: ['measurement_id', 'temple_length', 'bridge_width', 'lens_width', 'material', 'color', 'style', 'frame_type'],
        },
        {
          model: Lens,
          as: 'lens',
          attributes: ['lens_id', 'lens_type', 'material', 'color', 'power', 'is_prescription'],
        },
      ],
      attributes: ['product_id', 'name', 'price', 'product_type', 'images', 'gender'], // Added 'gender' to the attributes
    });

    const formattedProducts = products.map(product => {
      const productData = product.get({ plain: true });
      return {
        product_id: productData.product_id,
        name: productData.name,
        price: productData.price,
        product_type: productData.product_type,
        images: productData.images,
        gender: productData.gender, // Included the gender field in the response
        frame_measurement_id: productData.frame_measurement_id,
        lens_id: productData.lens_id,
        frame_measurements: productData.frame ? { temple_length: productData.frame.temple_length, bridge_width: productData.frame.bridge_width, lens_width: productData.frame.lens_width, material: productData.frame.material, color: productData.frame.color, style: productData.frame.style, frame_type: productData.frame.frame_type } : null,
        lens: productData.lens ? { lens_type: productData.lens.lens_type, material: productData.lens.material, color: productData.lens.color, power: productData.lens.power, is_prescription: productData.lens.is_prescription } : null,
      };
    });

    res.setHeader('Content-Type', 'application/json');
    res.json(formattedProducts);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

export default router;