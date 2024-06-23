import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administrador',
  description: 'Administrador de gestión educativa',
};

export default function AdministradorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
