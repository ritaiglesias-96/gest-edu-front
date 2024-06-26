import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estudiante',
};

export default function EstudianteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
