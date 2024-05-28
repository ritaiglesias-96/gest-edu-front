import Profile from '@/components/Profile/profile';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfil',
};

export default function EditarPerfilPage() {
  return (
    <section>
      <Profile />
    </section>
  );
}
