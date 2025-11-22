'use client';

import React, { Component, ReactNode } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Card,
} from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Client-side error boundary component for catching React errors.
 * Use this to wrap specific sections of your app that need isolated error handling.
 * 
 * Example usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleLogin = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Box bg="bg.canvas" minH="100vh" p={8}>
          <VStack gap={6} maxW="2xl" mx="auto" mt={20}>
            <Card.Root bg="bg.surface" borderColor="border.default" borderWidth="1px" w="full">
              <Card.Body>
                <VStack gap={6} align="center" textAlign="center" py={8}>
                  <Box fontSize="5xl" role="img" aria-label="Error">
                    ⚠️
                  </Box>

                  <Heading size="xl" color="text.primary">
                    Oops! Something went wrong
                  </Heading>

                  <Text color="text.secondary" fontSize="md" maxW="md">
                    We&apos;re sorry, but something unexpected happened. Please try again.
                  </Text>

                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <Box
                      bg="bg.subtle"
                      p={4}
                      borderRadius="md"
                      w="full"
                      maxW="md"
                      textAlign="left"
                    >
                      <Text fontSize="sm" fontFamily="mono" color="text.secondary">
                        {this.state.error.message}
                      </Text>
                    </Box>
                  )}

                  <VStack gap={3} w="full" maxW="xs">
                    <Button
                      onClick={this.handleReset}
                      colorPalette="blue"
                      size="lg"
                      w="full"
                    >
                      Try Again
                    </Button>

                    <Button
                      onClick={this.handleLogin}
                      variant="outline"
                      colorPalette="blue"
                      size="lg"
                      w="full"
                    >
                      Go to Login
                    </Button>
                  </VStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

