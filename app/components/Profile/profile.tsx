'use client';

import { Role, User } from '@/lib/definitions';
import Image from 'next/image';

export default function Profile() {
  const user: User = {
    nombre: 'Jane',
    apellido: 'Doe',
    email: 'janedoe@mail.com',
    password: '',
    role: Role.estudiante,
    imagen:
      'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.29350-15/345246766_196321919934409_8390276178172233635_n.jpg?stp=dst-jpg_e35_p750x750_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzQweDE2NzMuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=_jIlnMR-EwIQ7kNvgHQIu0M&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AYDGxkMftFxQ_U81CaDr9baFCb3KvP-CguMfHdV77-ZdsA&oe=664C8EF8&_nc_sid=cf751b',
    fechaNac: '12/12/1990',
    ci: '12546897',
    telefono: '099546987',
    domicilio: '',
  };

  return (
    <div className=' rounded-2xl sm:bg-ivory sm:my-4 sm:w-2/3 min-h-full'>
      <Image
        src={user.imagen}
        alt='user image'
        width={200}
        height={100}
        style={{
          objectFit: 'cover',
          height: '200px',
          borderRadius: '50%',
          padding: '10px',
        }}
      />
    </div>
  );
}
