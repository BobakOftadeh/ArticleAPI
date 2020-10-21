import { Router } from 'express';
import { createArticle, getArticles } from '../controllers/articleController';

const router = Router();

router.post('/', createArticle);

router.get('/', getArticles);
router.patch('/:id');
router.delete('/:id');

export default router;
