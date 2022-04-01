import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import { IProduct } from '../interfaces/IProduct';

export default class ProductsService {
  private productsModel: ProductsModel;

  constructor() {
    this.productsModel = new ProductsModel(connection);
  }

  public getAll: () => Promise<IProduct[] | undefined>
  = async (): Promise<IProduct[] | undefined> =>
    this.productsModel.getAll();

  public create: (product: IProduct) => Promise<IProduct | undefined>
  = async (product): Promise<IProduct | undefined> =>
    this.productsModel.create(product);
}
