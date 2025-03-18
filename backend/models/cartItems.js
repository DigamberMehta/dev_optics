import { DataTypes } from 'sequelize';

const CartItemsModel = (sequelize) => {
  const CartItems = sequelize.define('CartItems', {
    cart_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts', // Reference the Carts model
        key: 'cart_id',
      },
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.INTEGER, // Assuming your Products model uses INTEGER for product_id
      allowNull: false,
      references: {
        model: 'Products', // Reference the Products model
        key: 'product_id',
      },
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    customization_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    customizations: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
    },
  }, {
    tableName: 'CartItems',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });

  return CartItems;
};

export default CartItemsModel;