import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Funcionario',
  description: 'Administrador de gestión educativa',
};

export default function FuncionarioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
