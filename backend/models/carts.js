// models/carts.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Users from './users.js'; // Import Users model - will be handled in index.js

const CartsModel = (sequelize) => {
  const Carts = sequelize.define('Carts', {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users', // Use the string name here
        key: 'user_id',
      },
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
    tableName: 'Carts',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });

  return Carts;
};

export default CartsModel;