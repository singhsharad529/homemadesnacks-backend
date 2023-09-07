const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Mongodb Connected...');
    }).catch(err => {
        console.error('Mongodb Connection Error:', err);
    });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db..');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}