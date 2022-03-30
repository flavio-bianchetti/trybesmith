import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const nameSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

const amountSchema = Joi.object({
  amount: Joi.string().min(2).required(),
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

const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, amount } = req.body;
  const resultName = nameSchema.validate({ name });
  const resultAmount = amountSchema.validate({ amount });

  if (resultName.error) {
    const nameError = verifyIndice(resultName.error.details[0].message, 'Name');
    return res.status(nameError.code).json({ error: nameError.error });
  }

  if (resultAmount.error) {
    const amountError = verifyIndice(resultAmount.error.details[0].message, 'Amount');
    return res.status(amountError.code).json({ error: amountError.error });
  }
  next();
};

export default validateProduct;
