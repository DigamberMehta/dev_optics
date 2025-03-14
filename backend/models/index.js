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
import AddressesModel from './addresses.js';
import CategoriesModel from './categories.js';
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

// Initialize Models by passing the sequelize instance
const Users = UsersModel(sequelize);
const Addresses = AddressesModel(sequelize);
const Categories = CategoriesModel(sequelize);
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

Addresses.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasMany(Addresses, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// New Category Relations
Categories.belongsTo(Categories, { foreignKey: 'parent_category_id', as: 'ParentCategory' });
Categories.hasMany(Categories, { foreignKey: 'parent_category_id', as: 'SubCategories' });

// New Product Relations
Products.belongsTo(Categories, { foreignKey: 'category_id' });
Categories.hasMany(Products, { foreignKey: 'category_id', onDelete: 'CASCADE' });

Products.belongsTo(FrameMeasurements, { foreignKey: 'frame_measurement_id', as: 'frame' });
FrameMeasurements.hasMany(Products, { foreignKey: 'frame_measurement_id', as: 'products' });

Products.belongsTo(Lens, { foreignKey: 'lens_id', as: 'lens' });
Lens.hasMany(Products, { foreignKey: 'lens_id', as: 'products' });

Orders.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Orders, { foreignKey: 'user_id' });
Orders.belongsTo(Addresses, { foreignKey: 'address_id' });
Addresses.hasMany(Orders, { foreignKey: 'address_id' });

OrderItems.belongsTo(Orders, { foreignKey: 'order_id' });
Orders.hasMany(OrderItems, { foreignKey: 'order_id' });

Prescriptions.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasMany(Prescriptions, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Appointments.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasMany(Appointments, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Carts.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasOne(Carts, { foreignKey: 'user_id', onDelete: 'CASCADE' });

CartItems.belongsTo(Carts, { foreignKey: 'cart_id' });
Carts.hasMany(CartItems, { foreignKey: 'cart_id' });

Reviews.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Reviews, { foreignKey: 'user_id' });
Reviews.belongsTo(Products, { foreignKey: 'product_id' });
Products.hasMany(Reviews, { foreignKey: 'product_id' });

EyeTests.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Users.hasMany(EyeTests, { foreignKey: 'user_id', onDelete: 'CASCADE' });


export {
    sequelize,
    Users,
    Addresses,
    Categories,
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
};

// If table does not exist, create table
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized!');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });