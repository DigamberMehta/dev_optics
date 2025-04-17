import express from 'express';
import slugify from 'slugify';
import { sequelize, Orders, Users, OrderItems, Products, FrameMeasurements, Lens } from '../models/index.js';
import authenticateToken from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js';

const router = express.Router();

router.get('/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await Orders.findAll({
      order: [['order_date', 'DESC']],
      include: [
        { model: Users, attributes: ['user_id', 'name', 'email'] },
        {
          model: OrderItems, as: 'orderItems', include: [{ model: Products, as: 'product' }]
        }
      ]
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Admin fetch orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

router.post('/products', authenticateToken, isAdmin, async (req, res) => {
  const { product: productData, frame: frameData, lens: lensData } = req.body;

  if (!productData || !productData.name || !productData.price || !productData.product_type) {
    return res.status(400).json({ message: 'Missing required product fields (name, price, product_type)' });
  }

  const t = await sequelize.transaction();

  try {
    let frame_measurement_id = null;
    let lens_id = null;

    const cleanNumericInput = (value) => {
      if (value === '' || value === null || value === undefined) {
        return null;
      }
      const num = parseFloat(value);
      return isNaN(num) ? null : num;
    };

    const cleanIntegerInput = (value) => {
        if (value === '' || value === null || value === undefined) {
          return null;
        }
        const num = parseInt(value, 10);
        return isNaN(num) ? null : num;
      };

    const processedFrameData = {};
    if (frameData && Object.keys(frameData).length > 0) {
        processedFrameData.temple_length = cleanNumericInput(frameData.temple_length);
        processedFrameData.bridge_width = cleanNumericInput(frameData.bridge_width);
        processedFrameData.lens_width = cleanNumericInput(frameData.lens_width);
        processedFrameData.lens_height = cleanNumericInput(frameData.lens_height);
        processedFrameData.material = frameData.material || null;
        processedFrameData.color = Array.isArray(frameData.color) ? frameData.color : (frameData.color ? [frameData.color] : null); 
        processedFrameData.style = frameData.style || null;
        processedFrameData.frame_type = frameData.frame_type || null;
        processedFrameData.rim_details = frameData.rim_details || null;

        
        if (Object.values(processedFrameData).some(v => v !== null && v !== undefined && (!Array.isArray(v) || v.length > 0))) {
             const newFrame = await FrameMeasurements.create(processedFrameData, { transaction: t });
             frame_measurement_id = newFrame.measurement_id;
        }
    }

    const processedLensData = {};
    if (lensData && Object.keys(lensData).length > 0) {
        processedLensData.lens_type = lensData.lens_type || null;
        processedLensData.is_prescription = !!lensData.is_prescription;
        processedLensData.material = lensData.material || null;
        processedLensData.power = cleanNumericInput(lensData.power);
        processedLensData.has_anti_reflective_coating = !!lensData.has_anti_reflective_coating;
        processedLensData.has_uv_protection = !!lensData.has_uv_protection;
        processedLensData.is_polarized = !!lensData.is_polarized;
        processedLensData.has_blue_light_filter = !!lensData.has_blue_light_filter;
        processedLensData.is_photochromic = !!lensData.is_photochromic;
        processedLensData.is_tinted = !!lensData.is_tinted;
        processedLensData.tint_color = lensData.tint_color || null;
        processedLensData.blue_light_filter_strength = lensData.blue_light_filter_strength || null; 
        processedLensData.coating_type = lensData.coating_type || null;

        
        if (Object.values(processedLensData).some(v => v !== null && v !== undefined && v !== false)) { 
            const newLens = await Lens.create(processedLensData, { transaction: t });
            lens_id = newLens.lens_id;
        }
    }

    if (!productData.name) {
        await t.rollback();
        return res.status(400).json({ message: "Product name is required to generate a slug." });
    }

    let baseSlug = slugify(productData.name, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g }); 
    let uniqueSlug = baseSlug;
    let counter = 1;
    let existingSlug = true;

    while (existingSlug) {
        const slugExists = await Products.findOne({
            where: { slug: uniqueSlug },
            attributes: ['product_id'],
            transaction: t
        });
        if (!slugExists) {
            existingSlug = false;
        } else {
             
            uniqueSlug = `${baseSlug.substring(0, 240)}-${counter++}`; 
        }
    }

    const finalProductData = {
      ...productData,
      price: cleanNumericInput(productData.price),
      frame_measurement_id: frame_measurement_id,
      lens_id: lens_id,
      slug: uniqueSlug,
      new_arrivals: !!productData.new_arrivals,
      frequently_bought: !!productData.frequently_bought,
      images: Array.isArray(productData.images) ? productData.images : [],
      gender: productData.gender || null,
      description: productData.description || null,
    };

    if (finalProductData.price === null) {
        await t.rollback();
        return res.status(400).json({ message: 'Price is required and must be a valid number.' });
    }
    if (finalProductData.product_type === null || finalProductData.product_type === '') {
         await t.rollback();
         return res.status(400).json({ message: 'Product Type is required.' });
     }


    const newProduct = await Products.create(finalProductData, { transaction: t });

    await t.commit();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });

  } catch (error) {
    await t.rollback();
    console.error('Add product error:', error);
     if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Validation Error', errors: error.errors ? error.errors.map(e => e.message) : [error.message] });
    }
    res.status(500).json({ message: error.message || 'Failed to add product', error: error.message });
  }
});

router.get('/products', async (req, res) => {
    try {
      const products = await Products.findAll({
        order: [['createdAt', 'DESC']], // Show newest first, adjust as needed (e.g., [['name', 'ASC']])
        include: [
          // Make sure aliases 'frameMeasurement' and 'lens' are correctly defined
          // in your Products model associations (belongsTo)
          {
            model: FrameMeasurements,
            as: 'frameMeasurement', // Check this alias in your Product model definition
            attributes: ['material', 'style', 'frame_type', 'rim_details', 'color'] // Select specific frame attributes you want
          },
          {
            model: Lens,
            as: 'lens', // Check this alias in your Product model definition
            attributes: ['lens_type', 'material', 'has_blue_light_filter', 'is_polarized'] // Select specific lens attributes
          }
        ],
        attributes: [ // Select specific product attributes
          'product_id',
          'name',
          'description',
          'price',
          'product_type',
          'images',
          'gender',
          'slug',
          'new_arrivals',
          'frequently_bought',
          'createdAt' // Include if needed for sorting or display
        ]
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error('Fetch all products error:', error);
      res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
  });
  
export default router;