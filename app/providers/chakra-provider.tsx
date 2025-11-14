'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import system from '@/app/theme';

export function ChakraUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="soul-guardian-theme"
    >
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </ThemeProvider>
  );
}

