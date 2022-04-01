import connection from '../models/connection';
import UsersModel from '../models/users.model';
import { IUser } from '../interfaces/IUser';
import tokenGenerator from '../util/auth/tokenGenerator';

export default class UsersService {
  private usersModel: UsersModel;

  constructor() {
    this.usersModel = new UsersModel(connection);
  }

  public create: (user: IUser) => Promise<{ token: string } | undefined>
  = async (user): Promise<{ token: string } | undefined> => {
    const { username } = user;

    const result = await this.usersModel.findByName(username);

    if (result) return undefined;

    const newUser = await this.usersModel.create(user);
    
    if (!newUser || !newUser.id) return undefined;

    return tokenGenerator({ id: newUser.id, username });
  };

  public getToken = async (username: string, password: string)
  : Promise<{ token: string } | undefined> => {
    const user = await this.usersModel.findByName(username);

    if (!user || user.password !== password) return undefined;

    return tokenGenerator({ id: user.id, username });
  };
}
