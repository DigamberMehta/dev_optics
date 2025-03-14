// models/index.js
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


// Import all models
import Roles from './roles';
import Users from './users';
import Addresses from './addresses';
import Categories from './categories';
import Products from './products';
import ProductVariants from './productVariants';
// import ProductImages from './productImages'; // Removed
import Orders from './orders';
import OrderItems from './orderItems';
import Prescriptions from './prescriptions';
import Appointments from './appointments';
import Carts from './carts';
import CartItems from './cartItems';
import Reviews from './reviews';
import Promotions from './promotions';
import EyeTests from './eyeTests';
import FrameMeasurements from './frameMeasurements';
import StockMovement from './stockMovement';


// Define Associations (Relationships)
Users.belongsTo(Roles, { foreignKey: 'role_id' }); // Users belongs to Role
Roles.hasMany(Users, { foreignKey: 'role_id' }); // Role has many Users

Addresses.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Addresses belongs to User, Cascade delete
Users.hasMany(Addresses, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many Addresses

Categories.belongsTo(Categories, { foreignKey: 'parent_category_id', as: 'ParentCategory' }); // Category can have a parent Category
Categories.hasMany(Categories, { foreignKey: 'parent_category_id', as: 'SubCategories' }); // Category can have many sub-categories

Products.belongsTo(Categories, { foreignKey: 'category_id' }); // Products belongs to Category
Categories.hasMany(Products, { foreignKey: 'category_id', onDelete: 'CASCADE' }); // Category has many Products, Cascade delete

ProductVariants.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE' }); // ProductVariants belongs to Product, Cascade delete
Products.hasMany(ProductVariants, { foreignKey: 'product_id', onDelete: 'CASCADE' }); // Product has many ProductVariants

// ProductImages.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE' }); // Removed
// Products.hasMany(ProductImages, { foreignKey: 'product_id', onDelete: 'CASCADE' }); // Removed

Orders.belongsTo(Users, { foreignKey: 'user_id' }); // Orders belongs to User
Users.hasMany(Orders, { foreignKey: 'user_id' }); // User has many Orders
Orders.belongsTo(Addresses, { foreignKey: 'address_id' }); // Orders belongs to Address
Addresses.hasMany(Orders, { foreignKey: 'address_id' }); // Addresses has many Orders

OrderItems.belongsTo(Orders, { foreignKey: 'order_id' }); // OrderItems belongs to Order
Orders.hasMany(OrderItems, { foreignKey: 'order_id' }); // Order has many OrderItems
OrderItems.belongsTo(ProductVariants, { foreignKey: 'variant_id' }); // OrderItems belongs to ProductVariant
ProductVariants.hasMany(OrderItems, { foreignKey: 'variant_id' }); // ProductVariant has many OrderItems

Prescriptions.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Prescriptions belongs to User, Cascade delete
Users.hasMany(Prescriptions, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many Prescriptions

Appointments.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Appointments belongs to User, Cascade delete
Users.hasMany(Appointments, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many Appointments

Carts.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Carts belongs to User, Cascade delete
Users.hasOne(Carts, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has one Cart (one-to-one relationship as per schema)

CartItems.belongsTo(Carts, { foreignKey: 'cart_id' }); // CartItems belongs to Cart
Carts.hasMany(CartItems, { foreignKey: 'cart_id' }); // Cart has many CartItems
CartItems.belongsTo(ProductVariants, { foreignKey: 'variant_id' }); // CartItems belongs to ProductVariant
ProductVariants.hasMany(CartItems, { foreignKey: 'variant_id' }); // ProductVariant has many CartItems

Reviews.belongsTo(Users, { foreignKey: 'user_id' }); // Reviews belongs to User
Users.hasMany(Reviews, { foreignKey: 'user_id' }); // User has many Reviews
Reviews.belongsTo(Products, { foreignKey: 'product_id' }); // Reviews belongs to Product
Products.hasMany(Reviews, { foreignKey: 'product_id' }); // Product has many Reviews

StockMovement.belongsTo(ProductVariants, { foreignKey: 'variant_id' }); // StockMovement belongs to ProductVariant
ProductVariants.hasMany(StockMovement, { foreignKey: 'variant_id' }); // ProductVariant has many StockMovement

EyeTests.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // EyeTests belongs to User, Cascade delete
Users.hasMany(EyeTests, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many EyeTests

FrameMeasurements.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // FrameMeasurements belongs to User, Cascade delete
Users.hasMany(FrameMeasurements, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many FrameMeasurements


export {
    sequelize,
    Roles,
    Users,
    Addresses,
    Categories,
    Products,
    ProductVariants,
    // ProductImages, // Removed from export
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
    StockMovement,
};