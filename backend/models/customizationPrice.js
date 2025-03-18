import { DataTypes } from 'sequelize';

const CustomizationPriceModel = (sequelize) => {
  const CustomizationPrice = sequelize.define('CustomizationPrice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    attribute_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    attribute_value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price_adjustment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: 'CustomizationPrices',
    timestamps: false,
  });
  return CustomizationPrice;
};

export default CustomizationPriceModel;