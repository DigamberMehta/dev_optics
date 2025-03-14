// models/eyeTests.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Users from './users'; // Import Users model

const EyeTests = sequelize.define('EyeTests', {
  test_id: {
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
  test_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  results: {
    type: DataTypes.TEXT,
  },
  optometrist_id: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'EyeTests',
  timestamps: false, // Assuming no timestamps in the original schema for EyeTests
});

export default EyeTests;