// models/appointments.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Users from './users.js'; // Import Users model - will be handled in index.js

const AppointmentsModel = (sequelize) => {
  const Appointments = sequelize.define('Appointments', {
    appointment_id: {
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
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('eye_exam', 'consultation'),
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    },
    notes: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'Appointments',
    timestamps: false,
  });

  return Appointments;
};

export default AppointmentsModel;