import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const productsSchema = Joi.object({
  products: Joi.array().items(Joi.number().required()).strict().required(),
});

const verifyIndice = (errorMessage: string, indice: string): { code: number, error: string } => {
  switch (true) {
    case errorMessage.includes('is required'):
      return {
        code: StatusCodes.BAD_REQUEST, error: `${indice} is required`,
      };
    case errorMessage.includes('must be a number') || errorMessage.includes('must be an array'):
      return {
        code: StatusCodes.UNPROCESSABLE_ENTITY, error: `${indice} must be an array of numbers`,
      };
    case errorMessage.includes('required value'):
      return {
        code: StatusCodes.UNPROCESSABLE_ENTITY, error: `${indice} can't be empty`,
      };
    default:
      return { code: StatusCodes.BAD_REQUEST, error: `${indice} is required` };
  }
};

const productsValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { products } = req.body;
  try { 
    const { error } = productsSchema.validate({ products });
    if (error) {
      const productsError = verifyIndice(error.details[0].message, 'Products');
      return res.status(productsError.code).json({
        error: productsError.error,
      });
    }
    next();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Products is required' });
  }
};

export default productsValidator;
