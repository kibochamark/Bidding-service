import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator to require specific permissions for an endpoint
 * Usage: @RequirePermissions('create:bid', 'read:products')
 */
export const RequirePermissions = (...permissions: string[]) =>
    SetMetadata(PERMISSIONS_KEY, permissions);
