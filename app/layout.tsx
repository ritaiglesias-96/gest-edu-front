import type { Metadata } from 'next';
import { poppins } from './styles/fonts';
import './globals.css';
import Navbar from './components/Navbar/navbar';
import { authMail, authRol } from './utils/auth';
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
  const role = authRol();
  const mail = authMail();
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <Navbar rol={role} mail={mail} />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
