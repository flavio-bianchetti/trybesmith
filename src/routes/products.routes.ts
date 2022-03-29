import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const router = Router();

const productsController = new ProductsController();

router.get('/products', productsController.getAll);

export default router;
