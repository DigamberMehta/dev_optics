// models/frameMeasurements.js
import { DataTypes } from 'sequelize';

const FrameMeasurementsModel = (sequelize) => {
  const FrameMeasurements = sequelize.define('FrameMeasurements', {
    measurement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    temple_length: {
      type: DataTypes.DECIMAL(5, 2),
    },
    bridge_width: {
      type: DataTypes.DECIMAL(5, 2),
    },
    lens_width: {
      type: DataTypes.DECIMAL(5, 2),
    },
    material: {
      type: DataTypes.STRING(50),
    },
    color: {
      type: DataTypes.STRING(50),
    },
    style: {
      type: DataTypes.STRING(50),
    },
    frame_type: {
      type: DataTypes.ENUM('glasses', 'sunglasses', 'sports', 'fashion'),
      allowNull: true,
      comment: 'Categorization of the frame type',
    },
  }, {
    tableName: 'FrameMeasurements',
    timestamps: false,
  });

  return FrameMeasurements;
};

export default FrameMeasurementsModel;