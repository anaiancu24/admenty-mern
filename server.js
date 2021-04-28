const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

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

// Serve static assets if we're in production
if (process.env.NODE_ENV === 'production') {
    // Set a static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))