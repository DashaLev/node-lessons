const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { MONGO_CONNECT_URL, PORT, DEFAULT_STATUS_ERR } = require('./configs');
const { authRouter, postRouter, userRouter } = require('./routers');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
});
