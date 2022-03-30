import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import {
  validateUsername,
  validateClasse,
  validateLevel,
  validatePassword,
} from '../middlewares/users.middleware';

const router = Router();

const usersController = new UsersController();

router.post(
  '/users',
  validateUsername,
  validateClasse,
  validateLevel,
  validatePassword,
  usersController.create,
);

export default router;
