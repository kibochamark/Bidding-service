import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class KindeAuthGuard implements CanActivate {
    private jwksClient;
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
