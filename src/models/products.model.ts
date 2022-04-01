import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces/IProduct';

export default class ProductsModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll: () => Promise<IProduct[] | undefined>
  = async (): Promise<IProduct[] | undefined> => {
    try {
      const [result] = await this.connection
        .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.Products;');
      return result as IProduct[];
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  public create: (p: IProduct) => Promise<IProduct | undefined>
  = async (product): Promise<IProduct | undefined> => {
    try {
      const { name, amount } = product;
      const result = await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);',
        [name, amount],
      );
      const [dataInserted] = result;
      const { insertId } = dataInserted;
      return { id: insertId, ...product };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  public getById: (id: number) => Promise<IProduct | undefined>
  = async (id): Promise<IProduct | undefined> => {
    try {
      const [result] = await this.connection
        .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.Products WHERE id = ?;', [id]);
      const [rows] = result;
      return rows as IProduct;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  public update: (p: IProduct) => Promise<IProduct | undefined> 
  = async (product: IProduct): Promise<IProduct | undefined> => {
    try {
      const { id, name, amount, orderId } = product;
      await this.connection.execute<ResultSetHeader>(
        'UPDATE Trybesmith.Products SET name = ?, amount = ?, orderId = ? WHERE id = ?;',
        [name, amount, orderId, id],
      );
      return { id, name, amount, orderId };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
}
