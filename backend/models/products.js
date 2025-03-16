import { DataTypes } from 'sequelize';

const ProductModel = (sequelize) => {
  const Product = sequelize.define('Product', {
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
        'Accessories',

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
      defaultValue:[],
    },
    gender: { // Added gender field
      type: DataTypes.ENUM('men', 'women', 'kid', 'unisex'),
      allowNull: true,
    },
    new_arrivals: { // Added new arrivals field
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    frequently_bought: { // Added frequently brought field
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'Products',
    timestamps: true,
  });

  return Product;
};

export default ProductModel;