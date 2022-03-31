import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
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

  public create = async (product: IProduct): Promise<IProduct> => {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  };

  public getById = async (id: number): Promise<IProduct> => {
    const [result] = await this.connection
      .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.Products WHERE id = ?;', [id]);
    const [rows] = result;
    return rows as IProduct;
  };

  public update = async (product: IProduct): Promise<IProduct | undefined> => {
    const { id, name, amount, orderId } = product;
    try {
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
