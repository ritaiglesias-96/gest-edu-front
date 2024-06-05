import type { Metadata } from 'next';
import { poppins } from './styles/fonts';
import './styles/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Navbar from './components/Navbar/navbar';
import { SessionProvider } from '../context/SessionContext';

export const metadata: Metadata = {
  title: {
    template: '%s | GestEdu',
    default: 'GestEdu',
  },
  description: 'Administrador de gestión educativa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AppRouterCacheProvider>
        <SessionProvider>
          <body className={`${poppins.className} antialiased`}>
            <Navbar />
            <main>{children}</main>
          </body>
        </SessionProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
