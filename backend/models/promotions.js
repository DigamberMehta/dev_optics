// models/promotions.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';

const Promotions = sequelize.define('Promotions', {
  promotion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  promotion_code: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  discount_type: {
    type: DataTypes.ENUM('percentage', 'fixed'),
  },
  discount_value: {
    type: DataTypes.DECIMAL(10, 2),
  },
  valid_from: {
    type: DataTypes.DATE,
  },
  valid_to: {
    type: DataTypes.DATE,
  },
  max_uses: {
    type: DataTypes.INTEGER,
  },
  used_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'Promotions',
  timestamps: false, // Assuming no timestamps in the original schema for Promotions
});

export default Promotions;