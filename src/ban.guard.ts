// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import redis from './util/redis';

// @Injectable()
// export class BanGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles =
//       this.reflector.get<string[]>('roles', context.getHandler()) ||
//       this.reflector.get<string[]>('roles', context.getClass());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     if (user) {
//       redis.set('ban', 'username', 'EX', 60);
//     }
//     return user;
//   }
// }
