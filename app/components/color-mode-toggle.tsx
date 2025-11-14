'use client';

import { IconButton } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <IconButton
        aria-label="Toggle color mode"
        variant="ghost"
        size="lg"
      >
        🌙
      </IconButton>
    );
  }

  const toggleColorMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <IconButton
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggleColorMode}
      variant="ghost"
      size="lg"
    >
      {isDark ? '☀️' : '🌙'}
    </IconButton>
  );
}

