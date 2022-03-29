import { Pool, RowDataPacket } from 'mysql2/promise';
import { IProduct } from '../interfaces/IProduct';

export default class ProductsModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<IProduct[]> => {
    const [result] = await this.connection
      .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.Products;');
    return result as IProduct[];
  };
}
