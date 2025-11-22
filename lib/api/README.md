# API Client Documentation

This directory contains the organized API client structure using Axios for all HTTP requests.

## Structure

```
lib/api/
├── client.ts      # Base axios configuration
├── auth.ts        # Authentication API calls
├── avatar.ts      # Avatar management API calls
├── user.ts        # User profile API calls
└── index.ts       # Central export point
```

## Usage

### Importing

```typescript
// Import specific modules
import { logout, exchangeAuthCode } from '@/lib/api/auth';
import { getAvatars, createAvatar, deleteAvatar } from '@/lib/api/avatar';
import { getUserProfile, updateUserProfile } from '@/lib/api/user';

// Or import everything
import * as api from '@/lib/api';
```

### Client vs Server

The API client provides two axios instances:

- **`serverApiClient`**: For server-side calls (Server Actions, API Routes)
- **`clientApiClient`**: For client-side calls (React components)

Both instances are pre-configured with:
- Base URL from environment variables
- Credentials/cookies handling
- Error interceptors

### Auth API

```typescript
// Exchange OAuth code for token (server-side)
const result = await exchangeAuthCode(code);

// Logout user (server-side)
await logout(authToken);
```

### Avatar API

```typescript
// Get all avatars (client-side)
const avatars = await getAvatars();

// Create avatar (client-side)
const newAvatar = await createAvatar({
  name: 'John Doe',
  relationship: 'Friend',
  photo: fileObject, // optional
});

// Delete avatar (client-side)
await deleteAvatar(avatarId);
```

### User API

```typescript
// Get user profile (server or client)
const user = await getUserProfile(isServer);

// Update user profile (server or client)
const updatedUser = await updateUserProfile({ firstName: 'John' }, isServer);
```

## Environment Variables

Make sure these are set:

- `BACKEND_API_URL` - Backend API URL (server-side)
- `NEXT_PUBLIC_BACKEND_API_URL` - Backend API URL (client-side)
- `NEXT_PUBLIC_RAINDROP_MCP_URL` - MCP URL for avatars (optional)

## Error Handling

All API functions use the `handleApiError` utility which:
- Extracts error messages from axios errors
- Logs errors with context
- Throws user-friendly error messages

```typescript
try {
  await createAvatar(data);
} catch (error) {
  // Error is already logged and formatted
  console.error(error.message);
}
```

## Adding New API Modules

1. Create a new file in `lib/api/` (e.g., `payment.ts`)
2. Import the appropriate client (`serverApiClient` or `clientApiClient`)
3. Define TypeScript interfaces for requests/responses
4. Create API functions
5. Export from `index.ts`

Example:

```typescript
// lib/api/payment.ts
import { serverApiClient, handleApiError } from './client';

export interface PaymentRequest {
  amount: number;
  currency: string;
}

export async function createPayment(data: PaymentRequest) {
  try {
    const response = await serverApiClient.post('/api/payments', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
```

Then add to `lib/api/index.ts`:

```typescript
export * from './payment';
```

