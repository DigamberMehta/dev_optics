import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('dev_optics', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// Test Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (err) {
    console.error('Connection failed:', err);
  }
})();

import UsersModel from './users.js';
import ProductsModel from './products.js';
import OrdersModel from './orders.js';
import OrderItemsModel from './orderItems.js';
import PrescriptionsModel from './prescriptions.js';
import AppointmentsModel from './appointments.js';
import CartsModel from './carts.js';
import CartItemsModel from './cartItems.js';
import ReviewsModel from './reviews.js';
import PromotionsModel from './promotions.js';
import EyeTestsModel from './eyeTests.js';
import FrameMeasurementsModel from './frameMeasurements.js';
import LensModel from './lens.js'; // Import Lens model
import CustomizationPriceModel from './customizationPrice.js'; // Import CustomizationPrice model
import WishlistsModel from './wishlists.js'; // Import Wishlists model

// Initialize Models by passing the sequelize instance
const Users = UsersModel(sequelize);
const Products = ProductsModel(sequelize);
const Orders = OrdersModel(sequelize);
const OrderItems = OrderItemsModel(sequelize);
const Prescriptions = PrescriptionsModel(sequelize);
const Appointments = AppointmentsModel(sequelize);
const Carts = CartsModel(sequelize);
const CartItems = CartItemsModel(sequelize);
const Reviews = ReviewsModel(sequelize);
const Promotions = PromotionsModel(sequelize);
const EyeTests = EyeTestsModel(sequelize);
const FrameMeasurements = FrameMeasurementsModel(sequelize);
const Lens = LensModel(sequelize); // Initialize Lens model
const CustomizationPrice = CustomizationPriceModel(sequelize); // Initialize CustomizationPrice model
const Wishlists = WishlistsModel(sequelize); // Initialize Wishlists model

// New Product Relations
Products.belongsTo(FrameMeasurements, { foreignKey: 'frame_measurement_id', as: 'frame' });
FrameMeasurements.hasMany(Products, { foreignKey: 'frame_measurement_id', as: 'products' });

Products.belongsTo(Lens, { foreignKey: 'lens_id', as: 'lens' });
Lens.hasMany(Products, { foreignKey: 'lens_id', as: 'products' });

Orders.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Orders, { foreignKey: 'user_id' });

OrderItems.belongsTo(Orders, { foreignKey: 'order_id', as: 'order' });
Orders.hasMany(OrderItems, { foreignKey: 'order_id', as: 'orderItems' });

// Define the association between OrderItems and Products
OrderItems.belongsTo(Products, {
  foreignKey: 'product_id',
  as: 'product',
  onDelete: 'CASCADE',
});
Products.hasMany(OrderItems, {
  foreignKey: 'product_id',
  as: 'orderItems',
});

Prescriptions.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasMany(Prescriptions, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Appointments.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasMany(Appointments, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Carts.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasOne(Carts, { foreignKey: 'user_id', onDelete: 'CASCADE' });

CartItems.belongsTo(Carts, { foreignKey: 'cart_id' });
Carts.hasMany(CartItems, { foreignKey: 'cart_id' });

// Define the association between CartItems and Products
CartItems.belongsTo(Products, {
  foreignKey: 'product_id',
  as: 'product',
  onDelete: 'CASCADE',
});
Products.hasMany(CartItems, {
  foreignKey: 'product_id',
  as: 'cartItems',
});

Reviews.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Reviews, { foreignKey: 'user_id' });
Reviews.belongsTo(Products, { foreignKey: 'product_id' });
Products.hasMany(Reviews, { foreignKey: 'product_id' });

EyeTests.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasMany(EyeTests, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Wishlist Associations
Wishlists.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasMany(Wishlists, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Wishlists.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Products.hasMany(Wishlists, { foreignKey: 'product_id', onDelete: 'CASCADE' });


export {
  sequelize,
  Users,
  Products,
  Orders,
  OrderItems,
  Prescriptions,
  Appointments,
  Carts,
  CartItems,
  Reviews,
  Promotions,
  EyeTests,
  FrameMeasurements,
  Lens,
  CustomizationPrice,
  Wishlists // Export the Wishlists model
};

// If table does not exist, create table
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized!');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });