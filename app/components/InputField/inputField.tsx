import { useState } from 'react';
import VisibilityIcon from '@/assets/svg/visibility.svg';
import VisibilityOffIcon from '@/assets/svg/visibility-off.svg';
import clsx from 'clsx';

interface InputFieldProps {
  className?: string;
  children?: React.ReactNode;
  placeholder?: string;
  type: string;
  name: string;
  label: string;
  required?: boolean;
  pattern?: string;
}

export default function InputField({
  children,
  placeholder,
  type,
  label,
  name,
  required,
  className,
  pattern,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (required && e.target.value === '') {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <>
      <div className={clsx('inputBox', className)}>
        <div className='flex w-full flex-row'>
          {children}
          <div className='flex w-full  flex-col'>
            <label
              htmlFor={name}
              className={
                'px-3 py-0 text-sm font-semibold sm:text-base' +
                (required ? ' after:content-["*"] after:text-garnet' : '')
              }
            >
              {label}{' '}
            </label>
            <input
              className={
                'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:outline-none sm:text-base'
              }
              pattern={pattern ? pattern : undefined}
              id={name}
              type={
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type
              }
              name={name}
              placeholder={placeholder}
              aria-describedby={`${name}-error`}
              required={required}
              onChange={handleInput}
            />
          </div>
        </div>
        {type === 'password' && (
          <button type='button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <VisibilityIcon className='h-auto w-6 fill-garnet sm:w-8' />
            ) : (
              <VisibilityOffIcon className='h-auto w-6 fill-garnet sm:w-8' />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className='self-start pl-2'>
          <p className='text-sm text-garnet'>Campo requerido</p>
        </div>
      )}
    </>
  );
}
