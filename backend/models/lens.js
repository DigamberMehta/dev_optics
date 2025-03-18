import { DataTypes } from 'sequelize';

const LensModel = (sequelize) => {
  const Lens = sequelize.define('Lens', {
    lens_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lens_type: {
      type: DataTypes.ENUM('single_vision', 'bifocal', 'progressive', 'other', 'plano'),
      allowNull: false,
    },
    is_prescription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Indicates if the lens is prescription or non-prescription (plano)',
    },
    material: {
      type: DataTypes.ENUM('polycarbonate', 'plastic', 'glass', 'trivex'), // Added enum for material
      allowNull: true,
    },
    power: {
      type: DataTypes.DECIMAL(4, 2),
    },
    has_anti_reflective_coating: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_uv_protection: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_polarized: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_blue_light_filter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_photochromic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_tinted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tint_color: {
      type: DataTypes.ENUM('none', 'gray', 'brown', 'green', 'blue'), // Added enum for tint color
      allowNull: true,
    },
    blue_light_filter_strength: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    coating_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'Lenses',
    timestamps: false,
  });

  return Lens;
};

export default LensModel;