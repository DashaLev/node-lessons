const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routers/users.router');
const authRouter = require('./routers/auth.router');
const { MONGO_CONNECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT,() => {
    console.log('App listen');
});
