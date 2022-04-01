import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductsService from '../services/products.service';
import { IProduct } from '../interfaces/IProduct';

export default class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  public getAll: (req: Request, res: Response) => Promise<void>
  = async (_req, res): Promise<void> => {
    const products: IProduct[] | undefined = await this.productsService.getAll();
    if (!products) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    } else {
      res.status(StatusCodes.OK).json(products);
    }
  };

  public create: (req: Request, res: Response) => Promise<void>
  = async (req, res): Promise<void> => {
    const product: IProduct = req.body;
    const item: IProduct | undefined = await this.productsService.create(product);
    if (!item) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    } else {
      res.status(StatusCodes.CREATED).json({ item });
    }
  };
}
