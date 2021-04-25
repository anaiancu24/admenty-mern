const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const checkins = require('./routes/api/checkin')

const app = express();
// bodyParser middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI

// Connect to MondoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))


// Use Routes
app.use('/api/checkins', checkins)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))