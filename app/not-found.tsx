import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Card,
  Link,
} from '@chakra-ui/react';
import { ColorModeToggle } from '../components/colorModeToggle';
import { getSignUpUrl } from '@workos-inc/authkit-nextjs';

export default async function NotFound() {
  const signUpUrl = await getSignUpUrl();

  return (
    <Box bg="bg.canvas" minH="100vh" p={8}>
      <VStack gap={6} maxW="2xl" mx="auto" mt={20}>
        <Box w="full" display="flex" justifyContent="flex-end">
          <ColorModeToggle />
        </Box>

        <Card.Root bg="bg.surface" borderColor="border.default" borderWidth="1px" w="full">
          <Card.Body>
            <VStack gap={6} align="center" textAlign="center" py={8}>
              {/* 404 Icon */}
              <Box fontSize="6xl" role="img" aria-label="Not Found">
                🔍
              </Box>

              <Heading size="2xl" color="text.primary">
                Page Not Found
              </Heading>

              <Text color="text.secondary" fontSize="lg" maxW="md">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
              </Text>

              <VStack gap={3} w="full" maxW="xs">
                <Link href="/" w="full">
                  <Button
                    colorPalette="blue"
                    size="lg"
                    w="full"
                  >
                    Go to Home
                  </Button>
                </Link>

                <Link href={signUpUrl} w="full">
                  <Button
                    variant="outline"
                    colorPalette="blue"
                    size="lg"
                    w="full"
                  >
                    Go to Login
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
}

