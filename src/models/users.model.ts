import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public findByName = async (userName: string): Promise<IUser> => {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ?;',
      [userName],
    );
    const [rows] = result;
    const [user] = rows as IUser[];
    return user;
  };

  public findById = async (userId: number): Promise<IUser> => {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE id = ?;',
      [userId],
    );
    const [rows] = result;
    const [user] = rows as IUser[];
    return user;
  };

  public create = async (user: IUser): Promise<IUser> => {
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
