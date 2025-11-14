'use client';

import { Box, Button, Link, Heading, Text, VStack, Card } from '@chakra-ui/react';
import { ColorModeToggle } from './color-mode-toggle';

interface HomeContentProps {
  user: {
    firstName?: string | null;
  } | null;
  signUpUrl?: string;
  signOutAction?: () => Promise<void>;
}

export function HomeContent({ user, signUpUrl, signOutAction }: HomeContentProps) {
  if (!user) {
    return (
      <Box bg="bg.canvas" minH="100vh" p={8}>
        <VStack gap={6} maxW="4xl" mx="auto">
          <Box w="full" display="flex" justifyContent="flex-end">
            <ColorModeToggle />
          </Box>

          <Card.Root bg="bg.surface" borderColor="border.default" borderWidth="1px" w="full">
            <Card.Body>
              <Heading color="text.primary" mb={4}>
                Welcome to Soul Guardian
              </Heading>
              <Text color="text.secondary" mb={6}>
                Please sign up to continue
              </Text>
              <Link href={signUpUrl}>
                <Button
                  colorPalette="blue"
                  size="lg"
                >
                  Sign up
                </Button>
              </Link>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg="bg.canvas" minH="100vh" p={8}>
      <VStack gap={6} maxW="4xl" mx="auto">
        <Box w="full" display="flex" justifyContent="space-between" alignItems="center">
          <Heading color="text.primary">
            Welcome back{user.firstName && `, ${user.firstName}`}
          </Heading>
          <ColorModeToggle />
        </Box>

        <Card.Root bg="bg.surface" borderColor="border.default" borderWidth="1px" w="full">
          <Card.Body>
            <Heading size="lg" color="text.primary" mb={2}>
              Dashboard
            </Heading>
            <Text color="text.secondary" mb={6}>
              You are successfully signed in. Toggle the theme using the button above!
            </Text>
            <form action={signOutAction}>
              <Button
                type="submit"
                colorPalette="blue"
                variant="outline"
              >
                Sign out
              </Button>
            </form>
          </Card.Body>
        </Card.Root>

        {/* Demo Card */}
        <Card.Root bg="bg.subtle" borderColor="border.emphasized" borderWidth="1px" w="full">
          <Card.Body>
            <Heading size="md" color="text.primary" mb={2}>
              Theme Demo
            </Heading>
            <Text color="text.secondary" mb={4}>
              This card uses semantic tokens that adapt to light/dark mode.
              Try toggling the theme!
            </Text>
            <VStack gap={3} align="stretch">
              <Box bg="blue.100" p={4} borderRadius="md">
                <Text color="blue.900" fontWeight="bold">Fixed Blue Color</Text>
                <Text color="blue.700" fontSize="sm">This stays blue in both modes</Text>
              </Box>
              <Box bg="brand.100" p={4} borderRadius="md">
                <Text color="brand.900" fontWeight="bold">Fixed Brand Color</Text>
                <Text color="brand.700" fontSize="sm">This stays the same in both modes</Text>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
}

