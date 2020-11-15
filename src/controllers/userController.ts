import { RequestHandler } from 'express';
import AppError from '../utils/appError';
import User from '../models/userModel';

export const createUser: RequestHandler = async (req, res, next) => {
  //const text = (req.body as { text: string }).text;
  try {
    const newUser = await User.create(req.body);
    const text = req.body;
    console.log(text);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    new AppError(err, 404);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  const user = await User.find();
  try {
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    new AppError(err, 404);
  }
};
