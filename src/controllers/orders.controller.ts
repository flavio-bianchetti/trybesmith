import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestCustom } from '../interfaces/RequestCustom';
import OrdersService from '../services/orders.service';
import { IOrder } from '../interfaces/IOrder';

export default class ProductsController {
  private ordersService: OrdersService;

  constructor() {
    this.ordersService = new OrdersService();
  }

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const orders: IOrder[] = await this.ordersService.getAll();
    res.status(StatusCodes.OK).json(orders);
  };

  // solução encontrada em:
  // https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
  public create = async (req: RequestCustom, res: Response): Promise<void> => {
    const { products } = req.body;
    const id = req.userId || 0;
    const order = await this.ordersService.create(products, id);
    if (order) {
      res.status(StatusCodes.CREATED).json(order);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
    }
  };
}
