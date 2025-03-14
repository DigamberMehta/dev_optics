// models/prescriptions.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Users from './users'; // Import Users model

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
      model: Users,
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
  updatedAt: 'expiry_date', // Though named expiry_date in schema, it's not updated_at behaviour, consider if this needs to be timestamp or just a date field. Keeping as per schema for now.
  createdAt: 'upload_date', //  Though named upload_date in schema, it's not createdAt behaviour, consider if this needs to be timestamp or just a date field. Keeping as per schema for now.
});

export default Prescriptions;