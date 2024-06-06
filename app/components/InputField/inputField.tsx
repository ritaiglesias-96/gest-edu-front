import { useState } from 'react';
import VisibilityIcon from '@/assets/svg/visibility.svg';
import VisibilityOffIcon from '@/assets/svg/visibility-off.svg';
import clsx from 'clsx';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  children?: React.ReactNode;
  placeholder?: string;
  type: string;
  name: string;
  label: string;
  required?: boolean;
  pattern?: string;
  value?: string | number;
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
  value,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {type === 'textarea' ? (
        <div className={clsx('inputBox', className)}>
          <div className='flex w-full flex-row'>
            {children}
            <div className='flex w-full flex-col text-black'>
              <label
                htmlFor={name}
                className={
                  'px-3 py-0 text-sm font-semibold sm:text-base' +
                  (required ? 'after:content-["*"] after:text-garnet' : '')
                }
              >
                {label}
              </label>
              <textarea
                className={
                  'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
                }
                name={name}
                placeholder={placeholder}
                aria-describedby={`${name}-error`}
                id={name}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={clsx('inputBox', className)}>
          <div className='flex w-full flex-row'>
            {children}
            <div className='flex w-full flex-col text-black'>
              <label
                htmlFor={name}
                className={
                  'px-3 py-0 text-sm font-semibold sm:text-base' +
                  (required ? 'after:content-["*"] after:text-garnet' : '')
                }
              >
                {label}
              </label>
              <input
                className={
                  'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
                }
                pattern={pattern}
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
                value={value}
                readOnly={value ? true : false}
              />
            </div>
          </div>
          {type === 'password' && (
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityIcon className='h-auto w-6 fill-garnet sm:w-8' />
              ) : (
                <VisibilityOffIcon className='h-auto w-6 fill-garnet sm:w-8' />
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
}
