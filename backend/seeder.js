const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { users } = require('./data/users');
const User = require('./models/userModel');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(
      PORT,
      console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    );
    console.log(`MongoDB Connected`);
  })
  .catch((err) => {
    console.log(err);
  });

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
