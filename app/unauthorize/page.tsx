import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Card,
  Link,
} from '@chakra-ui/react';
import { ColorModeToggle } from '../../components/colorModeToggle';
import { getSignUpUrl } from '@workos-inc/authkit-nextjs';

interface UnauthorizePageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function UnauthorizePage({ searchParams }: UnauthorizePageProps) {
  const params = await searchParams;
  const error = params.error;
  const signUpUrl = await getSignUpUrl();

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, { title: string; description: string }> = {
    missing_code: {
      title: 'Authentication Failed',
      description: 'The authentication code is missing. Please try logging in again.',
    },
    auth_failed: {
      title: 'Authentication Failed',
      description: 'We couldn\'t verify your credentials. Please try again.',
    },
    default: {
      title: 'Unauthorized',
      description: 'You are not authorized to access this resource. Please log in to continue.',
    },
  };

  const errorInfo = errorMessages[error || 'default'] || errorMessages.default;

  return (
    <Box bg="bg.canvas" minH="100vh" p={8}>
      <VStack gap={6} maxW="2xl" mx="auto" mt={20}>
        <Box w="full" display="flex" justifyContent="flex-end">
          <ColorModeToggle />
        </Box>

        <Card.Root bg="bg.surface" borderColor="border.default" borderWidth="1px" w="full">
          <Card.Body>
            <VStack gap={6} align="center" textAlign="center" py={8}>
              {/* Unauthorized Icon */}
              <Box fontSize="6xl" role="img" aria-label="Unauthorized">
                🔒
              </Box>

              <Heading size="2xl" color="text.primary">
                {errorInfo.title}
              </Heading>

              <Text color="text.secondary" fontSize="lg" maxW="md">
                {errorInfo.description}
              </Text>

              {/* Show error code in development */}
              {process.env.NODE_ENV === 'development' && error && (
                <Box
                  bg="bg.subtle"
                  p={3}
                  borderRadius="md"
                  w="full"
                  maxW="md"
                >
                  <Text fontSize="sm" fontFamily="mono" color="text.secondary">
                    Error code: {error}
                  </Text>
                </Box>
              )}

              <VStack gap={3} w="full" maxW="xs">
                <Link href={signUpUrl} w="full">
                  <Button
                    colorPalette="blue"
                    size="lg"
                    w="full"
                  >
                    Try Login Again
                  </Button>
                </Link>

                <Link href="/" w="full">
                  <Button
                    variant="outline"
                    colorPalette="blue"
                    size="lg"
                    w="full"
                  >
                    Go to Home
                  </Button>
                </Link>
              </VStack>

              <Text fontSize="sm" color="text.muted" mt={4}>
                If you continue to experience issues, please contact support.
              </Text>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
}

