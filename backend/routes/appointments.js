// routes/appointments.js
import express from 'express';
import { Appointments, Users } from '../models/index.js'; // Adjust if needed
import authenticateUser from '../middleware/auth.js'; // JWT middleware
import { parse, format, isBefore, isValid } from 'date-fns';

const router = express.Router();

// POST /api/appointments
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { date, time } = req.body;

    // Validate and parse date and time
    const appointmentDate = parse(date, 'yyyy-MM-dd', new Date());
    const parsedTime = parse(time, 'hh:mm a', new Date()); // e.g., '1:30 PM'

    if (!isValid(appointmentDate) || !isValid(parsedTime)) {
      return res.status(400).json({ message: 'Invalid date or time format.' });
    }

    // Convert parsed time to 24-hour format (MySQL TIME format: HH:mm:ss)
    const formattedTime = format(parsedTime, 'HH:mm:ss');

    // Combine for future datetime check
    const fullDateTime = new Date(`${date}T${formattedTime}`);
    if (isBefore(fullDateTime, new Date())) {
      return res.status(400).json({ message: 'Appointment time must be in the future.' });
    }

    // Optional: Check for slot conflict
    const existing = await Appointments.findOne({
      where: {
        appointment_date: date,
        appointment_time: formattedTime,
      },
    });

    if (existing) {
      return res.status(409).json({ message: 'This time slot is already booked.' });
    }

    // Create the appointment
    const newAppointment = await Appointments.create({
      user_id: req.user.user_id,
      appointment_date: date,
      appointment_time: formattedTime,
      type: 'eye_exam',
      status: 'scheduled',
    });

    return res.status(201).json({
      message: 'Appointment booked successfully.',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
