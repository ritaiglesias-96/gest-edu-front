import Form from '@/components/Form/form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ingresar',
};

export default function LoginPage() {
  return (
    <section>
      <Form />
    </section>
  );
}
