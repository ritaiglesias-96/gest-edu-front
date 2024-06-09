import GestEduLogo from './assets/svg/logo-light-vertical.svg';

export default function Home() {
  return (
    <section className='flex flex-1 flex-col items-center justify-center pt-10'>
      <GestEduLogo />
      <p className=' text-md text-ivory'>Administrador de gestión educativa</p>
    </section>
  );
}
