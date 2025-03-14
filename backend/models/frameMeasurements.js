// models/frameMeasurements.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Users from './users.js'; // Import Users model - will be handled in index.js

const FrameMeasurementsModel = (sequelize) => {
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
        model: 'Users', // Use the string name here
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
    timestamps: false,
  });

  return FrameMeasurements;
};

export default FrameMeasurementsModel;