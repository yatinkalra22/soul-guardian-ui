'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Link,
  Heading,
  Text,
  VStack,
  Card,
  Input,
  HStack,
  Image,
} from '@chakra-ui/react';
import { ColorModeToggle } from './colorModeToggle';
import { getAvatars, createAvatar, deleteAvatar, Avatar } from '@/lib/api/avatar';
import {
  BUTTON_LABELS,
  ERROR_MESSAGES,
  MESSAGES,
  DEFAULT_AVATAR_RELATIONSHIP,
} from '@/constants';

interface HomeContentProps {
  user: {
    firstName?: string | null;
  } | null;
  signUpUrl?: string;
  signOutAction?: () => Promise<void>;
}

function AvatarManager({ signOutAction }: { signOutAction?: () => Promise<void> }) {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<string>(DEFAULT_AVATAR_RELATIONSHIP);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // fetch avatars from API
  useEffect(() => {
    let mounted = true;

    async function fetchAvatars() {
      try {
        const data = await getAvatars();
        if (mounted) setAvatars(data);
      } catch (err) {
        console.warn('Error fetching avatars', err);
      }
    }

    fetchAvatars();
    return () => {
      mounted = false;
    };
  }, []);

  function resetForm() {
    setName('');
    setRelationship(DEFAULT_AVATAR_RELATIONSHIP);
    setImageFile(null);
    setPreview(null);
  }

  async function handleAdd() {
    if (!name.trim()) {
      alert(ERROR_MESSAGES.AVATAR.NAME_REQUIRED);
      return;
    }

    try {
      const created = await createAvatar({
        name: name.trim(),
        relationship,
        photo: imageFile ?? undefined,
      });

      setAvatars((s) => [created, ...s]);
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(ERROR_MESSAGES.AVATAR.CREATE_FAILED, err);
      alert(ERROR_MESSAGES.AVATAR.CREATE_FAILED);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteAvatar(id);
      setAvatars((s) => s.filter((a) => a.id !== id));
    } catch (err) {
      console.error(ERROR_MESSAGES.AVATAR.DELETE_FAILED, err);
      alert(ERROR_MESSAGES.AVATAR.DELETE_FAILED);
    }
  }

  return (
    <>
      <Card.Root bg="bg.surface" borderColor="border.default" borderWidth="1px" w="full">
        <Card.Body>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg" color="text.primary">
              Avatars
            </Heading>
            <HStack>
              <Button onClick={() => setShowModal(true)} colorScheme="blue">
                Add Avatar
              </Button>
            </HStack>
          </HStack>

          {avatars.length === 0 ? (
            <Text color="text.secondary" mb={4}>
              No avatars yet. Add one to get started.
            </Text>
          ) : (
            <VStack gap={3} alignItems="stretch">
              {avatars.map((a) => (
                <HStack key={a.id} justifyContent="space-between" p={3} borderRadius="md" bg="bg.canvas">
                  <HStack>
                    {a.image ? (
                      <Image boxSize="48px" objectFit="cover" borderRadius="full" src={a.image} alt={a.name} />
                    ) : (
                      <Box w="48px" h="48px" borderRadius="full" bg="gray.300" display="flex" alignItems="center" justifyContent="center">
                        <Text fontWeight="bold">{a.name.charAt(0).toUpperCase()}</Text>
                      </Box>
                    )}
                    <Box>
                      <Text fontWeight="semibold">{a.name}</Text>
                      <Text fontSize="sm" color="text.secondary">{a.relationship}</Text>
                    </Box>
                  </HStack>
                  <HStack>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(a.id)} colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          )}

          <Box mt={6}>
            <form action={signOutAction}>
              <Button type="submit" colorPalette="blue" variant="outline">
                Sign out
              </Button>
            </form>
          </Box>
        </Card.Body>
      </Card.Root>

      {showModal && (
        <Box position="fixed" inset={0} display="flex" alignItems="center" justifyContent="center" bg="rgba(0,0,0,0.4)">
          <Card.Root w="full" maxW="md" p={4}>
            <Card.Body>
              <Heading size="md" mb={3}>
                Add Avatar
              </Heading>

              <VStack gap={3} alignItems="stretch">
                <Box>
                  <Text mb={1}>Name</Text>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John" />
                </Box>

                <Box>
                  <Text mb={1}>Relationship</Text>
                  <select value={relationship} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRelationship(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: 6 }}>
                    <option>Parent</option>
                    <option>Sibling</option>
                    <option>Child</option>
                    <option>Partner</option>
                    <option>Friend</option>
                    <option>Other</option>
                  </select>
                </Box>

                <Box>
                  <Text mb={1}>Photo (optional)</Text>
                  <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
                </Box>

                {preview && (
                  <Box>
                    <Text mb={1}>Preview</Text>
                    <Image src={preview} alt="preview" boxSize="120px" objectFit="cover" borderRadius="md" />
                  </Box>
                )}

                <HStack justifyContent="flex-end" mt={2}>
                  <Button variant="ghost" onClick={() => { resetForm(); setShowModal(false); }}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" onClick={handleAdd}>
                    Add
                  </Button>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Box>
      )}
    </>
  );
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
                {MESSAGES.WELCOME}
              </Heading>
              <Text color="text.secondary" mb={6}>
                {MESSAGES.SIGN_UP_PROMPT}
              </Text>
              <Link href={signUpUrl}>
                <Button
                  colorPalette="blue"
                  size="lg"
                >
                  {BUTTON_LABELS.SIGN_UP}
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

  {/* Avatar section: list and add modal */}
  <AvatarManager signOutAction={signOutAction} />

      </VStack>
    </Box>
  );
}
