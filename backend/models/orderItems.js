// models/orderItems.js
import { DataTypes } from 'sequelize';

const OrderItemsModel = (sequelize) => {
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
        model: 'Orders', // Use the string name here
        key: 'order_id',
      },
    },
    product_id: { // Changed from variant_id to product_id
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // Use the string name here
        key: 'product_id',
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
    timestamps: false,
  });

  return OrderItems;
};

export default OrderItemsModel;