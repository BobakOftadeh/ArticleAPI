import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AppError from './utils/appError';
import articleRouter from './routes/articleRouter';
import userRouter from './routes/userRouter';
import { signup, signin, protect } from './utils/auth';
import cors from 'cors';

const app = express();
dotenv.config({ path: './.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

app.use(json());
app.use(cors());

app.use('/signup', signup);
app.use('/signin', signin);
app.use('/api', protect);
app.use('/api/v1/article', articleRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
