import FormContainer from '@/components/FormContainer/formContainer';
import Profile from '@/components/Profile/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfil',
};

export default function EditarPerfilPage() {
  return (
      <Profile/>
  );
}