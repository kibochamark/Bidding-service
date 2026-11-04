import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Require the caller to hold at least one of these Kinde role keys.
 * Usage: @RequireRoles('admin')
 */
export const RequireRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
