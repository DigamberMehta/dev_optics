// models/orders.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Users from './users.js'; // Import Users model - will be handled in index.js
// import Addresses from './addresses.js'; // Import Addresses model - will be handled in index.js
// import Promotions from './promotions.js'; // Import Promotions model - will be handled in index.js

const OrdersModel = (sequelize) => {
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
        model: 'Users', // Use the string name here
        key: 'user_id',
      },
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Addresses', // Use the string name here
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
        model: 'Promotions', // Use the string name here
        key: 'promotion_id',
      },
    },
  }, {
    tableName: 'Orders',
    timestamps: false,
  });

  return Orders;
};

export default OrdersModel;