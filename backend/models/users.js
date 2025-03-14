// models/users.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Roles from './roles'; // Import Roles model

const Users = sequelize.define('Users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Roles,
      key: 'role_id',
    },
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING(255),
  },
  first_name: {
    type: DataTypes.STRING(50),
  },
  last_name: {
    type: DataTypes.STRING(50),
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    onUpdate: DataTypes.NOW,
  },
  last_login: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Users',
  updatedAt: 'updated_at', // To match the schema's column name
  createdAt: 'created_at', // To match the schema's column name
});

export default Users;