import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import articleRouter from './routes/articleRouter';

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
app.use('/api/v1/article', articleRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
