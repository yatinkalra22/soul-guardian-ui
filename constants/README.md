# Constants Documentation

This directory contains all application-wide constants organized by domain.

## Structure

```
constants/
├── api.ts         # API URLs, endpoints, headers, HTTP methods
├── auth.ts        # Authentication configuration and error codes
├── routes.ts      # Application routes and paths
├── app.ts         # General app constants (cookies, environment, file upload)
├── ui.ts          # UI strings, messages, labels, icons
└── index.ts       # Central export point
```

## Usage

### Import from Central Index

```typescript
import { API_ENDPOINTS, ROUTES, BUTTON_LABELS, COOKIES } from '@/constants';
```

### Import from Specific Module

```typescript
import { API_ENDPOINTS } from '@/constants/api';
import { ROUTES } from '@/constants/routes';
import { BUTTON_LABELS } from '@/constants/ui';
```

## Constants Overview

### API Constants (`api.ts`)

- **`API_BASE_URLS`** - Backend and MCP URLs
- **`API_ENDPOINTS`** - All API endpoint paths
- **`HTTP_HEADERS`** - Standard HTTP headers
- **`HTTP_METHODS`** - HTTP method constants
- **`API_CONFIG`** - Timeout, retry settings

Example:
```typescript
const response = await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
```

### Auth Constants (`auth.ts`)

- **`WORKOS_CONFIG`** - WorkOS version lock information
- **`JWT_CONFIG`** - JWT decoding configuration
- **`AUTH_ERROR_CODES`** - Authentication error codes
- **`AUTH_RESPONSE_MESSAGES`** - Auth success messages
- **`SESSION_CONFIG`** - Session timeout settings

### Route Constants (`routes.ts`)

- **`PUBLIC_ROUTES`** - Public accessible routes
- **`PROTECTED_ROUTES`** - Authentication required routes
- **`ROUTES`** - All routes combined
- **`UNAUTHENTICATED_PATHS`** - Paths for middleware config
- **`EXTERNAL_URLS`** - External links (GitHub issues, etc.)

Example:
```typescript
redirect(PUBLIC_ROUTES.HOME);
```

### App Constants (`app.ts`)

- **`APP_METADATA`** - App name, version, description
- **`COOKIES`** - Cookie names
- **`ENVIRONMENT`** - Environment flags
- **`LOCALE`** - Language settings
- **`DATE_FORMATS`** - Date formatting strings
- **`FILE_UPLOAD`** - File size and type limits
- **`PAGINATION`** - Pagination defaults
- **`CACHE`** - Cache settings

Example:
```typescript
const authToken = cookieStore.get(COOKIES.AUTH_TOKEN);
```

### UI Constants (`ui.ts`)

- **`BUTTON_LABELS`** - All button text
- **`PAGE_TITLES`** - Page title strings
- **`MESSAGES`** - Welcome and info messages
- **`ERROR_MESSAGES`** - Error messages by category
- **`SUCCESS_MESSAGES`** - Success messages
- **`AVATAR_RELATIONSHIPS`** - Avatar relationship options
- **`DEFAULT_AVATAR_RELATIONSHIP`** - Default relationship value
- **`ICONS`** - Emoji/icon constants
- **`LOADING_MESSAGES`** - Loading state text
- **`PLACEHOLDERS`** - Input placeholder text
- **`ARIA_LABELS`** - Accessibility labels
- **`SIZES`** - Size constants for components

Example:
```typescript
<Button>{BUTTON_LABELS.SIGN_UP}</Button>
alert(ERROR_MESSAGES.AVATAR.NAME_REQUIRED);
```

## Benefits

1. **Single Source of Truth** - All constants in one place
2. **Type Safety** - TypeScript `as const` for literal types
3. **Easy Refactoring** - Change once, update everywhere
4. **Consistency** - Same values across the app
5. **Discoverability** - Easy to find what constants exist
6. **Maintainability** - Clear organization by domain
7. **No Magic Strings** - All hardcoded values are named

## Adding New Constants

1. Choose the appropriate file based on domain
2. Add to existing constant object or create new one
3. Use `as const` for type safety
4. Export from `index.ts` if needed
5. Document in this README

Example:
```typescript
// constants/api.ts
export const API_ENDPOINTS = {
  AUTH: {
    EXCHANGE: '/api/auth/exchange',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh', // New endpoint
  },
} as const;
```

## Best Practices

- Use SCREAMING_SNAKE_CASE for constant names
- Group related constants together
- Add JSDoc comments for complex constants
- Keep constants immutable with `as const`
- Don't put business logic in constants
- Use TypeScript types for better IDE support

