import { RequestHandler, Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { userType } from '../models/userType';
import AppError from '../utils/appError';

declare module 'express-serve-static-core' {
  interface Request {
    user: any;
  }
}

export const newToken = (user: userType) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string) =>
  new Promise<any>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup: RequestHandler = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' });
  }

  try {
    const user = await User.create(req.body);
    console.log(user);
    const token = newToken(user);

    return res.status(201).send({
      status: 'success',
      data: {
        token,
      },
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
};

export const signin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const invalid = { message: 'Invalid email and password combination' };

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (err) {
    next(new AppError(err, 401));
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).send(e);
  }

  const user = await User.findById(payload.id);

  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  req.user = user;
  next();
};
