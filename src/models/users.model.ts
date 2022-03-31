import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public findByName: (userName: string) => Promise<IUser> = async (userName): Promise<IUser> => {
    const result = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ?;',
      [userName],
    );
    const [rows] = result;
    const [user] = rows as IUser[];
    return user;
  };

  public findById: (userId: number) => Promise<IUser> = async (userId): Promise<IUser> => {
    const result = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE id = ?;',
      [userId],
    );
    const [rows] = result;
    const [user] = rows as IUser[];
    return user;
  };

  public create: (user: IUser) => Promise<IUser> = async (user): Promise<IUser> => {
    const { username, classe, level, password } = user;

    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?);',
      [username, classe, level, password],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  };
}
