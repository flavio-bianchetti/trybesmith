import jwt from 'jsonwebtoken';
import { IToken } from '../../interfaces/IToken';

const tokenGenerator = (data: IToken): { token: string } | undefined => {
  const SECRET = 'Trybe.Turma15.TriboB';
  try {
    const token = jwt.sign({ data }, SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return { token };
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export default tokenGenerator;
