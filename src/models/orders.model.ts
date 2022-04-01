import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IOrder } from '../interfaces/IOrder';
import { IOrderResult } from '../interfaces/IOrderResult';

export default class OrderModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll: () => Promise<IOrderResult[] | undefined>
  = async (): Promise<IOrderResult[] | undefined> => {
    try {
      const [rows] = await this.connection.execute<RowDataPacket[]>(
        `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS products
        FROM Trybesmith.Orders o
        INNER JOIN Trybesmith.Products p ON o.id = p.orderId
        GROUP BY o.userId, o.id;`,
      );
  
      const orders = rows as IOrderResult[];
  
      return orders;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  public create: (userId: number) => Promise<IOrder | undefined>
  = async (userId): Promise<IOrder | undefined> => {
    try {
      const result = await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Trybesmith.Orders (userId) VALUES (?);',
        [userId],
      );
      const [dataInserted] = result;
      const { insertId } = dataInserted;
      return {
        id: insertId,
        userId,
      };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
}
