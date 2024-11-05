const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const uri =
      'mongodb+srv://jeetpatel862:UxuBLbZBLMy5lQFO@starwars.x98ec.mongodb.net/?retryWrites=true&w=majority&appName=starwars';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb connected successfully');
  } catch (err) {
    console.error('Error connecting to mongodb atlas: ', err);
  }
};

module.exports = connectDB;
