import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import validTokenMiddleware from '../middlewares/validToken.middleware';
import productsValidator from '../middlewares/orders.middleware';

const router = Router();

const ordersController = new OrdersController();

router.get('/orders', ordersController.getAll);
router.post('/orders', validTokenMiddleware, productsValidator, ordersController.create);

export default router;
