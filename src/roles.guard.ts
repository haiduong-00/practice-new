import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from './user/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // let roles = this.reflector.get<string[]>('roles', context.getHandler());
    // if (roles) {
    //   roles = this.reflector.get<string[]>('roles', context.getClass());
    // }
    const roles =
      // this.reflector.getAllAndMerge<string[]>('roles', [
      //   context.getClass(),
      //   context.getHandler(),
      // ]);
      this.reflector.get<string[]>('roles', context.getHandler()) ||
      this.reflector.get<string[]>('roles', context.getClass());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    console.log(user, roles);
    const hasRole = () =>
      !!user.roles.find((role) => !!roles.find((item) => item === role));

    return user && user.roles && hasRole();
    // return matchRoles(roles, user.roles);
  }
}
