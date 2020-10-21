import { RequestHandler } from 'express';
import AppError from '../utils/appError';
import Article from '../models/articleModel';

const TODOS = [];

export const createArticle: RequestHandler = async (req, res, next) => {
  //const text = (req.body as { text: string }).text;
  try {
    const newArticle = await Article.create(req.body);
    const text = req.body;
    console.log(text);
    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    new AppError(err, 404);
  }
};

export const getArticles: RequestHandler = async (req, res, next) => {
  const articles = await Article.find();
  try {
    res.status(200).json({
      status: 'success',
      data: articles,
    });
  } catch (err) {
    new AppError(err, 404);
  }
};
