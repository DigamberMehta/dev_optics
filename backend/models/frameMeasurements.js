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
    lens_height: {
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
    rim_details: {
      type: DataTypes.ENUM('Full Rim', 'Half Rim', 'Rimless', 'Semi-Rimless', 'Other'), // Added rim_details as ENUM
      allowNull: true, // You can adjust this based on whether it's a required field
    },

  }, {
    tableName: 'FrameMeasurements',
    timestamps: false,
  });

  return FrameMeasurements;
};

export default FrameMeasurementsModel;