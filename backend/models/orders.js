// models/orders.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Users from './users'; // Import Users model
import Addresses from './addresses'; // Import Addresses model
import Promotions from './promotions'; // Import Promotions model

const Orders = sequelize.define('Orders', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'user_id',
    },
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Addresses,
      key: 'address_id',
    },
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
  },
  payment_status: {
    type: DataTypes.ENUM('paid', 'unpaid', 'refunded'),
  },
  payment_method: {
    type: DataTypes.STRING(50),
  },
  transaction_id: {
    type: DataTypes.STRING(255),
  },
  promotion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Promotions,
      key: 'promotion_id',
    },
  },
}, {
  tableName: 'Orders',
  timestamps: false, // Assuming no timestamps in the original schema for Orders
});

export default Orders;