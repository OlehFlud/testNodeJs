const express = require('express');

const http = require('http');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { config } = require('./config');

mongoose.connect( config.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', () => console.log('Connected'));
db.once('error', (error) => console.log('Error', error));

dotenv.config();

app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors())

const { authRouter, userRouter, commentRouter, postRouter } = require('./routes');

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

server.listen(
  process.env.PORT,
  () => console.log(`Server has been started on port ${process.env.PORT}`)
);
