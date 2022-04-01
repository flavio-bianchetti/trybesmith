import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/users.service';
import { IUser } from '../interfaces/IUser';

export default class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public create: (req: Request, res: Response) => Promise<void>
  = async (req, res): Promise<void> => {
    const user: IUser = req.body;
    const token: { token: string } | undefined = await this.usersService.create(user);
    if (!token) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
    } else {
      res.status(StatusCodes.CREATED).json(token);
    }
  };

  public getToken: (req: Request, res: Response) => Promise<void>
  = async (req, res): Promise<void> => {
    const { username, password }: IUser = req.body;
    const token: { token: string } | undefined = await this
      .usersService.getToken(username, password);
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Username or password invalid' });
    } else {
      res.status(StatusCodes.OK).json(token);
    }
  };
}
