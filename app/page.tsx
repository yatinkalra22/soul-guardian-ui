import { getSignUpUrl } from '@workos-inc/authkit-nextjs';
import { HomeContent } from '../components/homeContent';
import { getAuthUser, signOutUser } from '../lib/auth';

async function handleSignOut() {
  'use server';
  await signOutUser();
}

export default async function HomePage() {
  // We created our own method to get the user from the JWT token as token is generated from the custom backend endpoint
  const { user } = await getAuthUser();
  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  return (
      <HomeContent
        user={user}
        signUpUrl={signUpUrl}
        signOutAction={handleSignOut}
      />
  );
}
