// models/lens.js
import { DataTypes } from 'sequelize';

const LensModel = (sequelize) => {
  const Lens = sequelize.define('Lens', {
    lens_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Explicitly define the lens type (Single, Bifocal, etc.)
    lens_type: {
      type: DataTypes.ENUM('single_vision', 'bifocal', 'progressive', 'other'),
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING(50),
    },
    color: {
      type: DataTypes.STRING(50),
    },
    power: {
      type: DataTypes.DECIMAL(4, 2), // e.g., -2.50, +2.00
    },
  }, {
    tableName: 'Lenses',
    timestamps: false,
  });

  return Lens;
};

export default LensModel;