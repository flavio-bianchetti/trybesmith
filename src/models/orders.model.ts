import { Pool, RowDataPacket } from 'mysql2/promise';
import { IOrder } from '../interfaces/IOrder';
import { IOrderResult } from '../interfaces/IOrderResult';

export default class OrderModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<IOrder[]> => {
    const [orders] = await this.connection
      .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.Orders;');
    const result = Promise.all(orders.map(async (order): Promise<IOrderResult> => {
      const [products] = await this.connection
        .execute<RowDataPacket[]>(
        'SELECT * FROM Trybesmith.Products WHERE orderId = ?;',
        [order.id],
      );
      return {
        id: order.id,
        userId: order.userId,
        products: products.map((product) => product.id),
      };
    }));
    return result;
  };
}