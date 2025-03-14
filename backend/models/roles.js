// models/roles.js
import { DataTypes } from 'sequelize';

const RolesModel = (sequelize) => {
  return sequelize.define('Roles', {
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
    timestamps: false,
  });
};

export default RolesModel;