import { DataTypes } from 'sequelize';
import slugify from 'slugify';

const ProductModel = (sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      product_type: {
        type: DataTypes.ENUM(
          'frame',
          'prescription_glasses',
          'sunglasses',
          'blue_light_glasses',
          'computer_glasses',
          'prescription_sunglasses',
          'Eyeglasses',
          'Reading_Glasses',
          'Contact_Lenses',
          'Accessories'
        ),
        allowNull: false,
      },
      frame_measurement_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'FrameMeasurements',
          key: 'measurement_id',
        },
        allowNull: true,
      },
      lens_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Lenses',
          key: 'lens_id',
        },
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      gender: {
        type: DataTypes.ENUM('men', 'women', 'kid', 'unisex'),
        allowNull: true,
      },
      new_arrivals: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      frequently_bought: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'Products',
      timestamps: true,
      hooks: {
        beforeCreate: async (product) => {
          await generateUniqueSlug(product);
        },
        beforeUpdate: async (product) => {
          if (product.changed('name')) {
            await generateUniqueSlug(product);
          }
        },
      },
    }
  );

  
  const generateUniqueSlug = async (product) => {
    // Generate slug from product name (not existing slug)
    let baseSlug = slugify(product.name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Fetch all similar slugs in one query (performance improvement)
    const existingSlugs = await Product.findAll({
      where: {
        slug: {
          [sequelize.Op.like]: `${baseSlug}%`, // Find slugs starting with baseSlug
        },
      },
      attributes: ['slug'],
    });

    const existingSlugSet = new Set(existingSlugs.map((p) => p.slug));

    // Ensure unique slug
    while (existingSlugSet.has(slug)) {
      slug = `${baseSlug}-${counter++}`;
    }

    product.slug = slug;
  };

  return Product;
};

export default ProductModel;
