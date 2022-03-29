import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductsService from '../services/products.service';
import { IProduct } from '../interfaces/IProduct';

export default class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const products: IProduct[] = await this.productsService.getAll();
    res.status(StatusCodes.OK).json(products);
  };
}
