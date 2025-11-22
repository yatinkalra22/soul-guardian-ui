'use client';

import { useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Card,
} from '@chakra-ui/react';
import { ColorModeToggle } from '../components/colorModeToggle';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  const handleLogin = () => {
    // Redirect to home page which will trigger the login flow
    window.location.href = '/';
  };

  return (
    <Box bg="bg.canvas" minH="100vh" p={8}>
      <VStack gap={6} maxW="2xl" mx="auto" mt={20}>
        <Box w="full" display="flex" justifyContent="flex-end">
          <ColorModeToggle />
        </Box>

        <Card.Root bg="bg.surface" borderColor="border.default" borderWidth="1px" w="full">
          <Card.Body>
            <VStack gap={6} align="center" textAlign="center" py={8}>
              {/* Error Icon */}
              <Box fontSize="6xl" role="img" aria-label="Error">
                ⚠️
              </Box>

              <Heading size="2xl" color="text.primary">
                Oops! Something went wrong
              </Heading>

              <Text color="text.secondary" fontSize="lg" maxW="md">
                We&apos;re sorry, but something unexpected happened. Please try again in a moment.
              </Text>

              {/* Show error details in development */}
              {process.env.NODE_ENV === 'development' && error.message && (
                <Box
                  bg="bg.subtle"
                  p={4}
                  borderRadius="md"
                  w="full"
                  maxW="md"
                  textAlign="left"
                >
                  <Text fontSize="sm" fontFamily="mono" color="text.secondary">
                    {error.message}
                  </Text>
                </Box>
              )}

              <VStack gap={3} w="full" maxW="xs">
                <Button
                  onClick={reset}
                  colorPalette="blue"
                  size="lg"
                  w="full"
                >
                  Try Again
                </Button>

                <Button
                  onClick={handleLogin}
                  variant="outline"
                  colorPalette="blue"
                  size="lg"
                  w="full"
                >
                  Go to Login
                </Button>
              </VStack>

              <Text fontSize="sm" color="text.muted" mt={4}>
                If the problem persists, please contact support.
              </Text>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
}

