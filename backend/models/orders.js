// models/orders.js
import { DataTypes } from 'sequelize';


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
        model: 'Users',
        key: 'user_id',
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
    // Remove address_id
    // Add shipping address fields
    shipping_state: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    shipping_street: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shipping_pincode: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    shipping_district: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    shipping_locality: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    shipping_houseNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    shipping_buildingName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'Orders',
    timestamps: false,
  });

  return Orders;
};

export default OrdersModel;