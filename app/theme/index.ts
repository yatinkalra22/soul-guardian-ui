import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Custom theme configuration for Chakra UI v3 with light/dark mode support
const customConfig = defineConfig({
  conditions: {
    light: '.light &',
    dark: '.dark &, &.dark, [data-theme="dark"] &',
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Inter', sans-serif` },
        body: { value: `'Inter', sans-serif` },
      },
      colors: {
        blue: {
          50: { value: '#e3f2fd' },
          100: { value: '#bbdefb' },
          200: { value: '#90caf9' },
          300: { value: '#64b5f6' },
          400: { value: '#42a5f5' },
          500: { value: '#2196f3' },
          600: { value: '#1e88e5' },
          700: { value: '#1976d2' },
          800: { value: '#1565c0' },
          900: { value: '#0d47a1' },
        },
        brand: {
          50: { value: '#f0f9ff' },
          100: { value: '#e0f2fe' },
          200: { value: '#bae6fd' },
          300: { value: '#7dd3fc' },
          400: { value: '#38bdf8' },
          500: { value: '#0ea5e9' },
          600: { value: '#0284c7' },
          700: { value: '#0369a1' },
          800: { value: '#075985' },
          900: { value: '#0c4a6e' },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Background colors that adapt to light/dark mode
        'bg.canvas': {
          value: {
            base: 'gray.50',
            _dark: 'gray.900',
          },
        },
        'bg.surface': {
          value: {
            base: 'white',
            _dark: 'gray.800',
          },
        },
        'bg.subtle': {
          value: {
            base: 'gray.100',
            _dark: 'gray.700',
          },
        },
        // Text colors that adapt to light/dark mode
        'text.primary': {
          value: {
            base: 'gray.900',
            _dark: 'gray.100',
          },
        },
        'text.secondary': {
          value: {
            base: 'gray.600',
            _dark: 'gray.400',
          },
        },
        'text.muted': {
          value: {
            base: 'gray.500',
            _dark: 'gray.500',
          },
        },
        // Border colors that adapt to light/dark mode
        'border.default': {
          value: {
            base: 'gray.200',
            _dark: 'gray.700',
          },
        },
        'border.emphasized': {
          value: {
            base: 'gray.300',
            _dark: 'gray.600',
          },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: 'bg.canvas',
      color: 'text.primary',
      transition: 'background-color 0.2s, color 0.2s',
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export default system;

