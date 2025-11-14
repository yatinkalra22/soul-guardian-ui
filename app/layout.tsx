import { AuthKitProvider } from '@workos-inc/authkit-nextjs';
import { ChakraUIProvider } from './providers/chakra-provider';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ChakraUIProvider>
          <AuthKitProvider>{children}</AuthKitProvider>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
