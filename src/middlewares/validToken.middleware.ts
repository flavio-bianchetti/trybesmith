import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { RequestCustom } from '../interfaces/RequestCustom';
import { IUser } from '../interfaces/IUser';
import { IToken } from '../interfaces/IToken';
import UsersModel from '../models/users.model';
import connection from '../models/connection';

const SECRET = 'Trybe.Turma15.TriboB';

// solução encontrada em:
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
const validateJWTMiddleware = async (req: RequestCustom, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token not found' });
  try {
    const decoded = jwt.verify(token, SECRET);

    if (typeof decoded !== 'string') {
      const { data } = decoded;
      const { id = 0 } = data as IToken;
      const usersModel: UsersModel = new UsersModel(connection);
      const user: IUser | undefined = await usersModel.findById(id);
      req.userId = user?.id;
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

export default validateJWTMiddleware;
