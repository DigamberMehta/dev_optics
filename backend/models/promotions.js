// models/promotions.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import

const PromotionsModel = (sequelize) => {
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
    timestamps: false,
  });

  return Promotions;
};

export default PromotionsModel;