const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/vehicle', require('./routes/vehicle.routes'));
app.use('/api/trip', require('./routes/trip.routes'));
app.use('/api/feedback', require('./routes/feedback.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {   
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (error) {
        console.log('Server Error', error.message)
        process.exit(1);
    }
}

start();
