const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const { MONGO_CONNECT_URL, PORT, DEFAULT_STATUS_ERR, ALLOWED_ORIGIN,
    CORS_NOT_ALLOWED, NODE_ENV } = require('./configs');
const startCron = require('./cron');
const { authRouter, postRouter, userRouter } = require('./routers');
const { ErrorHandler } = require('./errors');
const { checkDefaultData } = require('./util');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(helmet());
app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || DEFAULT_STATUS_ERR)
        .json({
            message: err.message
        });
});

app.listen(PORT,() => {
    console.log(`App listen ${PORT}`);
    checkDefaultData();
    startCron();
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}
