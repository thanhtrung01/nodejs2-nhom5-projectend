const express = require('express');
const app = express();
var cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('dotenv').config();
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to MongoDB');
    },
);

console.log(process.env.ACCESS_TOKEN_SECRET);

app.use(cors());

const foodRoute = require('./routes/user.route.js');

app.use("/v1/api/user",foodRoute);

app.listen(PORT, () => console.log(`server started ${PORT}`))