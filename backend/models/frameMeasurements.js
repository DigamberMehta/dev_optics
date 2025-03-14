// models/frameMeasurements.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Users from './users'; // Import Users model

const FrameMeasurements = sequelize.define('FrameMeasurements', {
  measurement_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'user_id',
    },
  },
  pupil_distance: {
    type: DataTypes.DECIMAL(5, 2),
  },
  frame_width: {
    type: DataTypes.DECIMAL(5, 2),
  },
  lens_height: {
    type: DataTypes.DECIMAL(5, 2),
  },
}, {
  tableName: 'FrameMeasurements',
  timestamps: false, // Assuming no timestamps in the original schema for FrameMeasurements
});

export default FrameMeasurements;