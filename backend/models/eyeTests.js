// models/eyeTests.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Users from './users.js'; // Import Users model - will be handled in index.js

const EyeTestsModel = (sequelize) => {
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
        model: 'Users', // Use the string name here
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
    timestamps: false,
  });

  return EyeTests;
};

export default EyeTestsModel;