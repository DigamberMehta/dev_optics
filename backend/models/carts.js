// models/carts.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Users from './users'; // Import Users model

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
      model: Users,
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
  updatedAt: 'updated_at', // To match the schema's column name
  createdAt: 'created_at', // To match the schema's column name
});

export default Carts;