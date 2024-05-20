import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coordinador',
  description: 'Administrador de gestión educativa',
};

export default function CoordinadorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
