'use client';
import UserIcon from '@/assets/svg/user.svg';
import Button from '@/components/Button/button';
import InputField from '@/components/InputField/inputField';
import FormContainer from '@/components/FormContainer/formContainer';
import { useFormState, useFormStatus } from 'react-dom';
import { altaCarrera } from '@/lib/data/coordinador/actions';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SessionContext } from '@/../context/SessionContext';

//TODO La descripción va a tener que ser un text area, Podes incluso mandarle al componente de input una opción pa que te renderice uno u otro
export default function AltaCarreraPage() {
  const path = usePathname();
  const router = useRouter();
  const session = useContext(SessionContext);

  const initialState = { message: '', errors: {} };
  const [alta, dispatch] = useFormState(altaCarrera, initialState);

  return (
    <FormContainer>
      <form
        className="flex min-h-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6"
        action={dispatch}
      >
        <h1 className="text-center text-2xl font-bold leading-snug text-black">
          Complete el formulario para agregar carrera
        </h1>
        <InputField
          placeholder="Nombre"
          type="text"
          name="nombre"
          label="Nombre"
        ></InputField>
        <div id="nombre-error" aria-live="polite" aria-atomic="true">
          {alta?.errors?.nombre &&
            alta.errors.nombre.map((error: string) => (
              <p className="mt-2 text-sm text-garnet" key={error}>
                {error}
              </p>
            ))}
        </div>
        <InputField
          placeholder="Descripcion"
          type="text"
          name="descripcion"
          label="Descripcion"
          pattern="textArea"
        ></InputField>
        <div id="descripcion-error" aria-live="polite" aria-atomic="true">
          {alta?.errors?.descripcion &&
            alta.errors.descripcion.map((error: string) => (
              <p className="mt-2 text-sm text-garnet" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="flex w-2/3 flex-col justify-between gap-1 sm:w-full sm:flex-row">
          <AltaCarreraButton />
        </div>
      </form>
    </FormContainer>
  );
}

function AltaCarreraButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" styling="primary" disabled={pending}>
      {pending ? 'Agregando...' : 'Agregar'}
    </Button>
  );
}
