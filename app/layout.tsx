import type { Metadata } from 'next';
import { poppins } from './styles/fonts';
import './styles/globals.css';
import Navbar from './components/Navbar/navbar';
import { SessionProvider } from '../context/SessionContext';
import { StyledEngineProvider } from '@mui/material/styles';

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
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
