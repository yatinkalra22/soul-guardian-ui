/**
 * UI Constants
 * All UI-related constants including messages, labels, and display values
 */

/**
 * Button Labels
 */
export const BUTTON_LABELS = {
  SIGN_UP: 'Sign up',
  SIGN_OUT: 'Sign out',
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  SUBMIT: 'Submit',
  CANCEL: 'Cancel',
  SAVE: 'Save',
  DELETE: 'Delete',
  EDIT: 'Edit',
  ADD: 'Add',
  CLOSE: 'Close',
  CONFIRM: 'Confirm',
  BACK: 'Back',
  NEXT: 'Next',
  TRY_AGAIN: 'Try Again',
  GO_HOME: 'Go Home',
} as const;

/**
 * Page Titles
 */
export const PAGE_TITLES = {
  HOME: 'Soul Guardian',
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND: 'Page Not Found',
  ERROR: 'Something went wrong',
} as const;

/**
 * Welcome Messages
 */
export const MESSAGES = {
  WELCOME: 'Welcome to Soul Guardian',
  WELCOME_BACK: 'Welcome back',
  SIGN_UP_PROMPT: 'Please sign up to continue',
  UNAUTHORIZED: 'You are not authorized to access this resource. Please log in to continue.',
  NOT_FOUND: 'The page you are looking for does not exist.',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  SUCCESS_GENERIC: 'Operation completed successfully',
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  AUTH: {
    MISSING_CODE: 'The authentication code is missing. Please try logging in again.',
    AUTH_FAILED: "We couldn't verify your credentials. Please try again.",
    UNAUTHORIZED: 'You are not authorized to access this resource. Please log in to continue.',
  },
  AVATAR: {
    FETCH_FAILED: 'Failed to fetch avatars',
    CREATE_FAILED: 'Failed to add avatar',
    DELETE_FAILED: 'Failed to delete avatar',
    NAME_REQUIRED: 'Please enter a name for the avatar',
  },
  NETWORK: {
    TIMEOUT: 'Request timed out. Please try again.',
    NO_CONNECTION: 'No internet connection. Please check your network.',
    SERVER_ERROR: 'Server error. Please try again later.',
  },
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  AVATAR: {
    CREATED: 'Avatar created successfully',
    UPDATED: 'Avatar updated successfully',
    DELETED: 'Avatar deleted successfully',
  },
  AUTH: {
    LOGGED_IN: 'Logged in successfully',
    LOGGED_OUT: 'Logged out successfully',
  },
} as const;

/**
 * Avatar Relationship Options
 */
export const AVATAR_RELATIONSHIPS = [
  'Friend',
  'Family',
  'Colleague',
  'Mentor',
  'Other',
] as const;

/**
 * Default Avatar Relationship
 */
export const DEFAULT_AVATAR_RELATIONSHIP = 'Friend' as const;

/**
 * Icons/Emojis
 */
export const ICONS = {
  UNAUTHORIZED: '🔒',
  NOT_FOUND: '🔍',
  ERROR: '⚠️',
  SUCCESS: '✅',
  WARNING: '⚠️',
  INFO: 'ℹ️',
} as const;

/**
 * Loading States
 */
export const LOADING_MESSAGES = {
  DEFAULT: 'Loading...',
  SAVING: 'Saving...',
  DELETING: 'Deleting...',
  UPLOADING: 'Uploading...',
  PROCESSING: 'Processing...',
} as const;

/**
 * Placeholder Text
 */
export const PLACEHOLDERS = {
  AVATAR_NAME: 'Enter avatar name',
  SEARCH: 'Search...',
  EMAIL: 'Enter your email',
  PASSWORD: 'Enter your password',
} as const;

/**
 * Aria Labels (for accessibility)
 */
export const ARIA_LABELS = {
  UNAUTHORIZED_ICON: 'Unauthorized',
  NOT_FOUND_ICON: 'Page not found',
  ERROR_ICON: 'Error',
  CLOSE_MODAL: 'Close modal',
  OPEN_MENU: 'Open menu',
  CLOSE_MENU: 'Close menu',
} as const;

/**
 * Size Constants
 */
export const SIZES = {
  BUTTON: {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
  },
  HEADING: {
    SMALL: 'lg',
    MEDIUM: 'xl',
    LARGE: '2xl',
  },
} as const;

