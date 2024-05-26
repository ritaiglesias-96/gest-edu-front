'use client';
import Link from 'next/link';
import Close from '@/assets/svg/close.svg';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function FormContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const finalSlashIndex = pathname.lastIndexOf('/');
  const previousPath = pathname.slice(0, finalSlashIndex);
  console.log(previousPath);
  return (
    <>
      <Link
        href={previousPath === '' ? '/' : previousPath}
        className='absolute z-0 size-full bg-garnet/60'
      />
      <div
        className={clsx(
          'relative z-10 mx-auto my-4 flex size-fit flex-col rounded-xl bg-ivory px-2 pb-6 pt-2 shadow-lg shadow-garnet md:p-10',
          className
        )}
      >
        <Link
          className='relative right-0 block w-fit cursor-pointer self-end'
          href={previousPath === '' ? '/' : previousPath}
        >
          <Close className=' self-end fill-garnet hover:fill-bittersweet sm:size-10' />
        </Link>
        {children}
      </div>
    </>
  );
}
