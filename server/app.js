import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import {config} from './config.js';
import {initSocket} from './connection/socket.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

//Tweets
app.use('/tweets', tweetsRouter);
app.use('/auth',authRouter);


app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

console.log(config.host.port);
const server = app.listen(config.host.port);
initSocket(server);


