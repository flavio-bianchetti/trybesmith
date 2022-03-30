import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const usernameSchema = Joi.object({
  username: Joi.string().min(3).required(),
});

const classeSchema = Joi.object({
  classe: Joi.string().min(3).required(),
});

const levelSchema = Joi.object({
  level: Joi.number().strict().min(1).required(),
});

const passwordSchema = Joi.object({
  password: Joi.string().min(8).required(),
});

const verifyIndice = (errorMessage: string, indice: string): { code: number, error: string } => {
  switch (true) {
    case errorMessage.includes('required'):
      return { code: StatusCodes.BAD_REQUEST, error: `${indice} is required` };
    case errorMessage.includes('string'):
      return { code: StatusCodes.UNPROCESSABLE_ENTITY, error: `${indice} must be a string` };
    case errorMessage.includes('characters'):
      return { code: StatusCodes.UNPROCESSABLE_ENTITY,
        error: `${indice} must be longer than 2 characters` };
    default:
      return { code: StatusCodes.UNPROCESSABLE_ENTITY, error: `${indice} is invalid` };
  }
};

const verifyLevel = (errorMessage: string, indice: string): { code: number, error: string } => {
  switch (true) {
    case errorMessage.includes('required'):
      return { code: StatusCodes.BAD_REQUEST, error: `${indice} is required` };
    case errorMessage.includes('number'):
      return { code: StatusCodes.UNPROCESSABLE_ENTITY, error: `${indice} must be a number` };
    case errorMessage.includes('greater'):
      return { code: StatusCodes.UNPROCESSABLE_ENTITY,
        error: `${indice} must be greater than 0` };
    default:
      return { code: StatusCodes.UNPROCESSABLE_ENTITY, error: `${indice} is invalid` };
  }
};

const verifyPassword = (errorMessage: string, indice: string): { code: number, error: string } => {
  switch (true) {
    case errorMessage.includes('required'):
      return { code: StatusCodes.BAD_REQUEST, error: `${indice} is required` };
    case errorMessage.includes('string'):
      return { code: StatusCodes.UNPROCESSABLE_ENTITY, error: `${indice} must be a string` };
    case errorMessage.includes('characters'):
      return { code: StatusCodes.UNPROCESSABLE_ENTITY,
        error: `${indice} must be longer than 7 characters` };
    default:
      return { code: StatusCodes.UNPROCESSABLE_ENTITY, error: `${indice} is invalid` };
  }
};

const validateUsername = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const resultUsername = usernameSchema.validate({ username });

  if (resultUsername.error) {
    const usernameError = verifyIndice(resultUsername.error.details[0].message, 'Username');
    return res.status(usernameError.code).json({ error: usernameError.error });
  }
  next();
};

const validateClasse = async (req: Request, res: Response, next: NextFunction) => {
  const { classe } = req.body;
  const resultClasse = classeSchema.validate({ classe });

  if (resultClasse.error) {
    const classeError = verifyIndice(resultClasse.error.details[0].message, 'Classe');
    return res.status(classeError.code).json({ error: classeError.error });
  }
  next();
};

const validateLevel = async (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body;
  const resultLevel = levelSchema.validate({ level });
  if (resultLevel.error) {
    const levelError = verifyLevel(resultLevel.error.details[0].message, 'Level');
    return res.status(levelError.code).json({ error: levelError.error });
  }
  next();
};

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const resultPassword = passwordSchema.validate({ password });

  if (resultPassword.error) {
    const passwordError = verifyPassword(resultPassword.error.details[0].message, 'Password');
    return res.status(passwordError.code).json({ error: passwordError.error });
  }
  next();
};

export {
  validateUsername,
  validateClasse,
  validateLevel,
  validatePassword,
};
