// models/roles.js
import { DataTypes } from 'sequelize';
import sequelize from '../index'; // Assuming index.js is in the parent directory

const Roles = sequelize.define('Roles', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'Roles',
  timestamps: false, // Assuming no timestamps in the original schema for Roles
});

export default Roles;