import { DataTypes } from 'sequelize';

const UsersModel = (sequelize) => {
  const Users = sequelize.define('Users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true, // Allow NULL values for phone
    },
    address: {
      type: DataTypes.JSON, // Store address as a JSON object
      allowNull: true, // Allow NULL values
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
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });

  return Users;
};

export default UsersModel;
