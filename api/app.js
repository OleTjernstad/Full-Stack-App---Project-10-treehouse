'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

const cors = require('cors');

const { sequelize } = require('./models');

const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');

// variable to enable global error logging
const enableGlobalErrorLogging =
    process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

/**
 * Test the db connection
 */
(async () => {
    await sequelize.authenticate();

    try {
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());

/**
 * Added cors package
 */
const corsOptions = {
    origin: new RegExp('^https?://(localhost|127.0.0.1)(:[0-9]+)?$'),
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

/**
 * Enable pre-flight requests
 */
app.options('*', cors());

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the REST API project!'
    });
});

/**
 * Routes
 */
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);

/**
 * 404 handler
 */
app.use((req, res) => {
    res.status(404).json({
        message: 'Route Not Found'
    });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }

    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
});
