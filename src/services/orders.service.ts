import connection from '../models/connection';
import OrdersModel from '../models/orders.model';
import ProductsModel from '../models/products.model';
import { IOrder } from '../interfaces/IOrder';

export default class OrdersService {
  private ordersModel: OrdersModel;

  private productsModel: ProductsModel;

  constructor() {
    this.ordersModel = new OrdersModel(connection);
    this.productsModel = new ProductsModel(connection);
  }

  public getAll = async (): Promise<IOrder[]> =>
    this.ordersModel.getAll();
  
  public create = async (products: number[], userId: number) => {
    const existProducts = Promise
      .all(products.map(async (product) => this.productsModel.getById(product)));

    if ((await existProducts).some((product) => product === undefined)) return undefined;

    const productsList = (await existProducts).filter((product) => product !== undefined);

    const order = await this.ordersModel.create(userId);

    const productsUpdated = Promise.all(products.map(async (product) => {
      const getProduct = productsList.find((p) => p.id === product);
      if (getProduct) {
        const { name, amount } = getProduct;
        return this.productsModel.update({ id: product, name, amount, orderId: order.id });
      }
    }));

    if ((await productsUpdated).some((product) => product === undefined)) return undefined;

    return { order: { userId, products } };
  };
}
