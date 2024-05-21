'use client';
import Link from 'next/link';
import Close from '@/assets/svg/close.svg';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const finalSlashIndex = pathname.lastIndexOf('/');
  const previousPath = pathname.slice(0, finalSlashIndex);
  return (
    <>
      <Link
        href={previousPath}
        className='absolute z-0 size-full bg-garnet/60'
      />
      <div className='relative mx-auto my-4 z-10 w-fit h-fit flex flex-col rounded-xl bg-ivory px-2 pb-6 pt-2 shadow-lg shadow-garnet md:p-10'>
        <Link
          className='relative right-0 block w-fit cursor-pointer self-end'
          href={previousPath}
        >
          <Close className=' self-end fill-garnet hover:fill-bittersweet sm:size-10' />
        </Link>
        {children}
      </div>
    </>
  );
}
