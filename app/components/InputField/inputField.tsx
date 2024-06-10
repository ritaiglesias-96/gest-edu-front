import { useEffect, useState } from 'react';
import VisibilityIcon from '@/assets/svg/visibility.svg';
import VisibilityOffIcon from '@/assets/svg/visibility-off.svg';
import clsx from 'clsx';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  children?: React.ReactNode;
  label: string;
}

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  children?: React.ReactNode;
  type: string;
  label: string;
}

export default function InputField(
  props: InputFieldProps | TextAreaFieldProps
) {
  const { children, ...otherProps } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [pass, setPass] = useState('password');

  function isTextAreaFieldProps(
    otherProps: InputFieldProps | TextAreaFieldProps
  ): otherProps is TextAreaFieldProps {
    return (otherProps as TextAreaFieldProps).type === 'textarea';
  }

  function isInputFieldProps(
    otherProps: InputFieldProps | TextAreaFieldProps
  ): otherProps is InputFieldProps {
    return (otherProps as InputFieldProps).type !== 'textarea';
  }

  useEffect(() => {
    if (!showPassword) {
      setPass('password');
    }
    if (showPassword) {
      setPass('text');
    }
  }, [showPassword]);

  return (
    <>
      {isTextAreaFieldProps(otherProps) && (
        <div className={clsx('inputBox', props.className)}>
          <div className='flex w-full flex-row'>
            {props.children}
            <div className='flex w-full flex-col text-black'>
              <label
                htmlFor={otherProps.name}
                className={
                  'px-3 py-0 text-sm font-semibold sm:text-base' +
                  (otherProps.required
                    ? 'after:content-["*"] after:text-garnet'
                    : '')
                }
              >
                {otherProps.label}
              </label>
              <textarea
                className={
                  'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
                }
                name={otherProps.name}
                placeholder={otherProps.placeholder}
                aria-describedby={`${otherProps.name}-error`}
                id={otherProps.name}
                {...otherProps}
              />
            </div>
          </div>
        </div>
      )}
      {isInputFieldProps(otherProps) && (
        <div className={clsx('inputBox', props.className)}>
          <div className='flex w-full flex-row'>
            {props.children}
            <div className='flex w-full flex-col text-black'>
              <label
                htmlFor={otherProps.name}
                className={
                  'px-3 py-0 text-sm font-semibold sm:text-base' +
                  (otherProps.required
                    ? 'after:content-["*"] after:text-garnet'
                    : '')
                }
              >
                {otherProps.label}
              </label>
              <input
                className={
                  'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
                }
                pattern={otherProps.pattern}
                id={otherProps.name}
                name={otherProps.name}
                placeholder={otherProps.placeholder}
                type={otherProps.type === 'password' ? pass : otherProps.type}
                aria-describedby={`${otherProps.name}-error`}
                required={otherProps.required}
                value={otherProps.value}
                readOnly={!!otherProps.value}
                onChange={otherProps.onChange}
              />
            </div>
          </div>
          {otherProps.type === 'password' && (
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
