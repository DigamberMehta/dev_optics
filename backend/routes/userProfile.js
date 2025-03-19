

import express from 'express';
import { Users } from '../models/index.js';  

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findByPk(userId, {
      attributes: ['name', 'email', 'phone', 'address'],
    });
    if (user) {
      res.json({ name: user.name, email: user.email, phone: user.phone, address: user.address });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});


router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, email, phone, houseNumber, buildingName, street, locality, district, state, pincode } = req.body;

  const address = {
    houseNumber,
    buildingName,
    street,
    locality,
    district,
    state,
    pincode,
  };

  try {
    const user = await Users.findByPk(userId);
    if (user) {
      await user.update({ name, email, phone, address });
      res.json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Failed to update user profile' });
  }
});

export default router; 