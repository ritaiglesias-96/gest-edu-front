import type { Metadata } from 'next';
import { poppins } from './styles/fonts';
import './styles/globals.css';
import Navbar from './components/Navbar/navbar';
import { Role } from './lib/definitions';
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
      <SessionProvider>
        <body className={`${poppins.className} antialiased`}>
          <Navbar />
          <main>{children}</main>
        </body>
      </SessionProvider>
    </html>
  );
}
