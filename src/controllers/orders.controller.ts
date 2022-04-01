import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestCustom } from '../interfaces/RequestCustom';
import OrdersService from '../services/orders.service';
import { IOrder } from '../interfaces/IOrder';
import { IProductsCreate } from '../interfaces/IProductsCreate';

export default class ProductsController {
  private ordersService: OrdersService;

  constructor() {
    this.ordersService = new OrdersService();
  }

  public getAll: (req: Request, res: Response) => Promise<void>
  = async (_req, res): Promise<void> => {
    const orders: IOrder[] | undefined = await this.ordersService.getAll();
    if (!orders) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    } else {
      res.status(StatusCodes.OK).json(orders);
    }
  };

  // solução encontrada em:
  // https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
  public create: (req: RequestCustom, res: Response) => Promise<void>
  = async (req, res): Promise<void> => {
    const { products }: IProductsCreate = req.body;
    const id: number = req.userId || 0;
    const order = await this.ordersService.create(products, id);
    if (!order) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
    } else {
      res.status(StatusCodes.CREATED).json(order);
    }
  };
}
