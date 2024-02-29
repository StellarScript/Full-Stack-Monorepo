import type { Request } from 'express';
import { ValidationPipe, ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 *
 * @description Get the user from the request object
 */
const UserDecorator = createParamDecorator(<T>(_: T, context: ExecutionContext) => {
   const request = context.switchToHttp().getRequest() as Request;
   return request['auth']['claims'];
});

/**
 *
 * @description User decorator with validation pipe
 */
export const User = () =>
   UserDecorator(
      new ValidationPipe({
         errorHttpStatusCode: 401,
         validateCustomDecorators: true,
      }),
   );
