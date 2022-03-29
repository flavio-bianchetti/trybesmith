import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import { IProduct } from '../interfaces/IProduct';

export default class ProductsService {
  private productsModel: ProductsModel;

  constructor() {
    this.productsModel = new ProductsModel(connection);
  }

  public getAll = async (): Promise<IProduct[]> => this.productsModel.getAll();
}