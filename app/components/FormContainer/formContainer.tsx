'use client';
import Link from 'next/link';
import Close from '@/assets/svg/close.svg';

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/" className="absolute z-0 size-full bg-garnet/60" />
      <div className="relative mx-auto my-2 z-10 flex flex-col rounded-xl bg-ivory px-2 pb-6 pt-2 shadow-lg shadow-garnet md:p-10">
        <Link
          className="relative right-0 block w-fit cursor-pointer self-end"
          href="/"
        >
          <Close className=" self-end fill-garnet hover:fill-bittersweet sm:size-10" />
        </Link>
        {children}
      </div>
    </>
  );
}
