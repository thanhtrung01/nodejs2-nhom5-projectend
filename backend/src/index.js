const express = require('express');
const app = express();
var cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('dotenv').config();
dotenv.config();

// Connect to Database
const port = process.env.PORT;
const url = process.env.MONGODB_URL
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(
    () => console.log('Connected to MongoDB')
  )
  .catch((error) => console.log(`can not connect to database, ${error}`, error.message),
);

console.log(process.env.ACCESS_TOKEN_SECRET);

app.use(cors());

const userRoute = require('./routes/v1/user.route.js');

app.use('/v1/api/user', userRoute);

app.listen(port, () => console.log(`server started ${port}`));
