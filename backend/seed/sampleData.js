// sampleUser.js
import { sequelize, Users } from '../models/index.js'; // Adjust the path if necessary

async function createSampleUser() {
  try {

    const newUser = await Users.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'samplepassword', // In a real application, hash the password
      phone: '123-456-7890',
      last_login: new Date(),
    });

    console.log('Sample user created successfully:', newUser.toJSON());
  } catch (error) {
    console.error('Error creating sample user:', error);
  } finally {
    // Close the Sequelize connection after the operation
    await sequelize.close();
  }
}

// Call the function to create the sample user
createSampleUser();