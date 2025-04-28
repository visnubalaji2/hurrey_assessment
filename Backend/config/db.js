const mongoose = require('mongoose');
const dbConnection = async () => {
  console.log(process.env.MONGO_URI)
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('+++Mongodb connected+++');
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = dbConnection;
