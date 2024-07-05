import type { Metadata } from 'next';
import { poppins } from './styles/fonts';
import './globals.css';
import { authMail, authRol } from './utils/auth';
import { SessionProvider } from '../context/SessionContext';
// Example of dynamically importing a component that uses Firebase Messaging
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./components/Navbar/navbar'), {
  ssr: false,
});

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
