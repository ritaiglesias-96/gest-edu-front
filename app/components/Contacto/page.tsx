'use client';
import Button from '../Button/button';
import EmailIcon from '@/assets/svg/email.svg';
import Link from 'next/link';
const emailGestEdu = process.env.NEXT_PUBLIC_EMAIL_GEST_EDU;

export default function Contacto() {
  return (
    <div className='absolute bottom-5 right-7 flex justify-end'>
      <Link href={`mailto:${emailGestEdu}`}>
        <Button styling='pill'>
          <EmailIcon className='h-auto w-6 bg-ivory sm:w-8' />
        </Button>
      </Link>
    </div>
  );
}
