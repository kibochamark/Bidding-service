# Kinde Authentication Setup

## Overview
This directory contains the Kinde authentication implementation for the bidding service.

## Components

### 1. KindeAuthGuard
Validates JWT tokens from Kinde and extracts user information.

### 2. PermissionsGuard
Checks if the authenticated user has required permissions.

### 3. CurrentUser Decorator
Extracts the authenticated user from the request.

### 4. RequirePermissions Decorator
Declares required permissions for an endpoint.

## Usage Examples

### Basic Authentication
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { KindeAuthGuard, CurrentUser, KindeUser } from 'src/auth';

@Controller('protected')
@UseGuards(KindeAuthGuard)
export class ProtectedController {
    @Get('profile')
    getProfile(@CurrentUser() user: KindeUser) {
        return {
            kindeId: user.kindeId,
            email: user.email,
            name: `${user.givenName} ${user.familyName}`,
        };
    }
}
```

### With Permission Checks
```typescript
import { Controller, Post, UseGuards } from '@nestjs/common';
import { KindeAuthGuard, PermissionsGuard, RequirePermissions, CurrentUser, KindeUser } from 'src/auth';

@Controller('bids')
@UseGuards(KindeAuthGuard, PermissionsGuard)
export class BidsController {
    @Post()
    @RequirePermissions('create:bid')
    createBid(@CurrentUser() user: KindeUser, @Body() data: CreateBidDto) {
        // Only users with 'create:bid' permission can access this
        return this.bidsService.create(user.kindeId, data);
    }
}
```

### Checking Roles
```typescript
@Get('admin/users')
@UseGuards(KindeAuthGuard)
async getUsers(@CurrentUser() user: KindeUser) {
    const isAdmin = user.roles.some(role => role.key === 'admin');
    if (!isAdmin) {
        throw new ForbiddenException('Admin access required');
    }
    // Admin-only logic
}
```

## Environment Variables

Make sure to set these in your `.env` file:

```env
KINDE_DOMAIN=your-domain.kinde.com
KINDE_CLIENT_ID=your-client-id
KINDE_CLIENT_SECRET=your-client-secret
KINDE_REDIRECT_URI=http://localhost:4000/callback
KINDE_LOGOUT_REDIRECT_URI=http://localhost:4000
```

## Frontend Integration

Your Next.js frontend should send the Kinde access token in the Authorization header:

```typescript
const response = await fetch('http://localhost:4000/api/protected', {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },
});
```

## Common Permissions

Based on your bidding platform, you might use:
- `read:products` - View product listings
- `create:bid` - Place bids
- `read:bids` - View own bids
- `create:seller` - Register as seller
- `manage:kyc` - Admin KYC review
- `read:users` - Admin user management
