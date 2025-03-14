// models/prescriptions.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Users from './users.js'; // Import Users model - will be handled in index.js

const PrescriptionsModel = (sequelize) => {
  const Prescriptions = sequelize.define('Prescriptions', {
    prescription_id: {
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
    file_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    upload_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiry_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM('approved', 'pending', 'expired'),
    },
  }, {
    tableName: 'Prescriptions',
    updatedAt: 'expiry_date',
    createdAt: 'upload_date',
  });

  return Prescriptions;
};

export default PrescriptionsModel;