// models/stockMovement.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import ProductVariants from './productVariants'; // Import ProductVariants model

const StockMovement = sequelize.define('StockMovement', {
  movement_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  variant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductVariants,
      key: 'variant_id',
    },
  },
  movement_type: {
    type: DataTypes.ENUM('in', 'out'),
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  movement_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'StockMovement',
  timestamps: false, // Assuming no timestamps in the original schema for StockMovement
});

export default StockMovement;