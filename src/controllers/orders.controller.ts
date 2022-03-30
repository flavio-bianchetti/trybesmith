import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
}
