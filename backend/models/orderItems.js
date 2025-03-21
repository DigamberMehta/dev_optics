// models/order-item.js
import { DataTypes } from 'sequelize';

const OrderItemModel = (sequelize) => {
  const OrderItem = sequelize.define('OrderItem', {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'order_id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'product_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    total_price: { // Now representing the total price for the item
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    customizations: {
      type: DataTypes.JSON, // Store customization details as a JSON object
      allowNull: true,
    },
    product_name_at_purchase: {
      type: DataTypes.STRING(255), // Store the product name at the time of order
      allowNull: false,
    },

  }, {
    tableName: 'OrderItems',
    timestamps: true,
    updatedAt: false,
  });

  return OrderItem;
};

export default OrderItemModel;