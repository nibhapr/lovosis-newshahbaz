import mongoose from 'mongoose';
import readline from 'readline';
import Admin from '../src/app/models/Admin';
import dotenv from 'dotenv';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function connectDB() {
  try {
    // Use the MongoDB URI from environment variables
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

async function createAdmin() {
  try {
    const username = await question('Enter username: ');
    const password = await question('Enter password: ');

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Username already exists');
      return;
    }

    const admin = new Admin({ username, password });
    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

async function loginAdmin() {
  try {
    const username = await question('Enter username: ');
    const password = await question('Enter password: ');

    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Invalid credentials');
      return;
    }

    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      console.log('Invalid credentials');
      return;
    }

    console.log('Login successful');
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

async function main() {
  await connectDB();
  await createAdmin();
  rl.close();
  mongoose.connection.close();
  process.exit(0);
}

main(); 