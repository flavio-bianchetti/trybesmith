import jwt from 'jsonwebtoken';

const tokenGenerator = (username: string): { token: string } | undefined => {
  const SECRET = 'Trybe.Turma15.TriboB';
  try {
    const data = {
      username,
    };
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
