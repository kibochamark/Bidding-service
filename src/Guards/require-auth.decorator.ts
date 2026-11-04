import { SetMetadata } from '@nestjs/common';

export const REQUIRE_AUTH_KEY = 'requireAuth';

/**
 * Require a valid, authenticated Kinde token with no specific permission
 * or role (e.g. "get my own data" endpoints). Usage: @RequireAuth()
 */
export const RequireAuth = () => SetMetadata(REQUIRE_AUTH_KEY, true);
