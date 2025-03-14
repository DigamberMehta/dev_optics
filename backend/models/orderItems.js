// models/orderItems.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Orders from './orders'; // Import Orders model
import ProductVariants from './productVariants'; // Import ProductVariants model

const OrderItems = sequelize.define('OrderItems', {
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Orders,
      key: 'order_id',
    },
  },
  variant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductVariants,
      key: 'variant_id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price_at_purchase: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'OrderItems',
  timestamps: false, // Assuming no timestamps in the original schema for OrderItems
});

export default OrderItems;