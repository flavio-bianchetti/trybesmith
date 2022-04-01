import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IOrder } from '../interfaces/IOrder';
import { IOrderResult } from '../interfaces/IOrderResult';
// import { IProduct } from '../interfaces/IProduct';

export default class OrderModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll: () => Promise<IOrderResult[]> = async (): Promise<IOrderResult[]> => {
    const [rows] = await this.connection.execute<RowDataPacket[]>(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS products
      FROM Trybesmith.Orders o
      INNER JOIN Trybesmith.Products p ON o.id = p.orderId
      GROUP BY o.userId, o.id;`,
    );

    const orders = rows as IOrderResult[];

    return orders;
  };

  public create: (userId: number) => Promise<IOrder> = async (userId): Promise<IOrder> => {
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
  };
}
