const mongoose = require('mongoose');
const config = require('config');
//const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Education:Education@cluster0.8mhay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      // useCreateIndex: true,
      useUnifiedTopology: true,
     // useFindAndModify: false,
      useNewUrlParser: true
    });
    console.log('Mongodb connected...');
  } catch (error) {
    console.log(error.message);

    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
// module.exports = () => {
//     return mongoose.connect(db,{"mongodb://localhost:27017/auth-web11"})
// }