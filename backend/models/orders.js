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
  }, {
    tableName: 'Orders',
    timestamps: false,
  });

  return Orders;
};

export default OrdersModel;