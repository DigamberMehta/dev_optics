import express from 'express';
const router = express.Router();
import { Products, FrameMeasurements, Lens, sequelize } from '../models/index.js';
import { Op } from 'sequelize'; // Import Op directly from Sequelize

router.get('/', async (req, res) => {
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
          attributes: ['lens_id', 'lens_type', 'material', 'power', 'is_prescription'],
        },
      ],
    });

    const formattedProducts = products.map(product => {
      const productData = product.get({ plain: true });
      return {
        product_id: productData.product_id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        product_type: productData.product_type,
        images: productData.images,
        gender: productData.gender,
        new_arrivals: productData.new_arrivals,
        frequently_bought: productData.frequently_bought,
        frame_measurement_id: productData.frame_measurement_id,
        lens_id: productData.lens_id,
        frame_measurements: productData.frame
          ? {
              temple_length: productData.frame.temple_length,
              bridge_width: productData.frame.bridge_width,
              lens_width: productData.frame.lens_width,
              material: productData.frame.material,
              color: productData.frame.color,
              style: productData.frame.style,
              frame_type: productData.frame.frame_type,
            }
          : null,
        lens: productData.lens
          ? {
              lens_type: productData.lens.lens_type,
              material: productData.lens.material,
              power: productData.lens.power,
              is_prescription: productData.lens.is_prescription,
            }
          : null, // Removed 'color' from lens object
        slug: productData.slug,
      };
    });

    res.setHeader('Content-Type', 'application/json');
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

router.get('/:id/:slug', async (req, res) => {
  const { id, slug } = req.params;

  try {
    const product = await Products.findOne({
      where: {
        product_id: id,
        slug: slug,
      },
      include: [
        {
          model: FrameMeasurements,
          as: 'frame',
        },
        {
          model: Lens,
          as: 'lens',
          attributes: ['lens_id', 'lens_type', 'material', 'power', 'is_prescription'], // Removed 'color'
        },
      ],
    });

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Search query is required.' });
  }

  const lowerQuery = q.toLowerCase(); // Convert the search query to lowercase

  try {
    const results = await Products.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${lowerQuery}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${lowerQuery}%`,
            },
          },
          // Add more fields from the Products model to search if needed
        ],
      },
      include: [
        {
          model: FrameMeasurements,
          as: 'frame',
          where: {
            [Op.or]: [
              {
                style: {
                  [Op.like]: `%${lowerQuery}%`,
                },
              },
              {
                material: {
                  [Op.like]: `%${lowerQuery}%`,
                },
              },
              {
                color: {
                  [Op.like]: `%${lowerQuery}%`,
                },
              },
              {
                frame_type: {
                  [Op.like]: `%${lowerQuery}%`,
                },
              },
              {
                rim_details: {
                  [Op.like]: `%${lowerQuery}%`,
                },
              },
              // Add more fields from FrameMeasurements to search
            ],
          },
          required: false,
        },
        {
          model: Lens,
          as: 'lens',
          where: {
            [Op.or]: [
              {
                lens_type: {
                  [Op.like]: `%${lowerQuery}%`,
                },
              },
              {
                material: {
                  [Op.like]: `%${lowerQuery}%`,
                },
              },
              {
                tint_color: {
                  [Op.like]: `%${lowerQuery}%`,
                },
              },
              // Add more fields from Lens to search
            ],
          },
          required: false,
        },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ message: 'Error performing search.', error: error.message });
  }
});


export default router;
