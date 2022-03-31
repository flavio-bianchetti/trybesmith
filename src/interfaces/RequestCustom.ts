// solução encontrada em:
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
import { Request } from 'express';

export interface RequestCustom extends Request {
  userId?: number;
}
