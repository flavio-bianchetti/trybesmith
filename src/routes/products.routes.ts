import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import productsMiddleware from '../middlewares/products.middleware';

const router = Router();

const productsController = new ProductsController();

router.get('/products', productsController.getAll);

router.post('/products', productsMiddleware, productsController.create);

export default router;
