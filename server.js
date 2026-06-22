const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error(err);
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, ' a tour must have a name']
    unique: true
  }
  rating: {
    type: Number,
    default: 4.5
  } 
  price: {
    type: Number,
    required: [true, ' a tour must have a price']
  }
})

const Tour = mongoose.model('Tour', tourschema)

console.log(process.env.NODE_ENV);
// console.log(process.env.APP_USERNAME);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
