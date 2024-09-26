const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../model/User");

async function seedAdmin() {
  // Connect to the database
  try {
    await mongoose.connect('mongodb://localhost:27017/db_course');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await UserModel.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create admin credentials
    const adminCredentials = {
      name: "Admin User",
      email: "admin@example.com",
      password: "adminpassword",
      role: "admin",
      // Add other fields as needed
    };

    // Hash the admin password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
    adminCredentials.password = hashedPassword;

    // Create admin user
    await UserModel.create(adminCredentials);

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
    console.log("Database connection closed");
  }
}

// Execute the admin seeder
seedAdmin()
  .then(() => {
    console.log("Admin seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding admin:", err);
    process.exit(1);
  });
