import type { Metadata } from 'next';
import { poppins } from './styles/fonts';
import './styles/globals.css';
import Navbar from './components/Navbar/navbar';
import { Role } from './lib/definitions';

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
    //TODO: change role according to session, context?
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        <Navbar type={Role.public} />
        <main>{children}</main>
      </body>
    </html>
  );
}
