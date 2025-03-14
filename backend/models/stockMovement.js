// models/stockMovement.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import ProductVariants from './productVariants.js'; // Import ProductVariants model - will be handled in index.js

const StockMovementModel = (sequelize) => {
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
        model: 'ProductVariants', // Use the string name here
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
    timestamps: false,
  });

  return StockMovement;
};

export default StockMovementModel;