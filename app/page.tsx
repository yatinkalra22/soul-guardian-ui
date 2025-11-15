import {
  getSignUpUrl,
  withAuth,
  signOut,
} from '@workos-inc/authkit-nextjs';
import { HomeContent } from '../components/homeContent';

async function handleSignOut() {
  'use server';
  await signOut();
}

export default async function HomePage() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await withAuth();

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
