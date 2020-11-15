import { Router } from 'express';
import { createArticle, getArticles } from '../controllers/articleController';

const router = Router();

router.get('/', getArticles).post('/', createArticle);

router.patch('/:id');
router.delete('/:id');

export default router;
