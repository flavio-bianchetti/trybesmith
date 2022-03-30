import connection from '../models/connection';
import OrdersModel from '../models/orders.model';
import { IOrder } from '../interfaces/IOrder';

export default class OrdersService {
  private ordersModel: OrdersModel;

  constructor() {
    this.ordersModel = new OrdersModel(connection);
  }

  public getAll = async (): Promise<IOrder[]> =>
    this.ordersModel.getAll();
}
