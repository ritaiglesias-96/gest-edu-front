import { useState } from 'react';
import VisibilityIcon from '@/assets/svg/visibility.svg';
import VisibilityOffIcon from '@/assets/svg/visibility-off.svg';
import clsx from 'clsx';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  children?: React.ReactNode;
  placeholder?: string;
  label: string;
  pattern?: string;
  value?: string | number;
}

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  children?: React.ReactNode;
  placeholder?: string;
  label: string;
  type: string;
  pattern?: string;
  value?: string | number;
}

export default function InputField(
  props: InputFieldProps | TextAreaFieldProps
) {
  const { children, ...otherProps } = props;
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <>
      {isTextAreaFieldProps(otherProps) && (
        <div className={clsx('inputBox', props.className)}>
          <div className='flex w-full flex-row'>
            {props.children}
            <div className='flex w-full flex-col text-black'>
              <label
                htmlFor={props.name}
                className={
                  'px-3 py-0 text-sm font-semibold sm:text-base' +
                  (props.required
                    ? 'after:content-["*"] after:text-garnet'
                    : '')
                }
              >
                {props.label}
              </label>
              <textarea
                className={
                  'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
                }
                name={props.name}
                placeholder={props.placeholder}
                aria-describedby={`${props.name}-error`}
                id={props.name}
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
                htmlFor={props.name}
                className={
                  'px-3 py-0 text-sm font-semibold sm:text-base' +
                  (props.required
                    ? 'after:content-["*"] after:text-garnet'
                    : '')
                }
              >
                {props.label}
              </label>
              <input
                className={
                  'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
                }
                pattern={props.pattern}
                id={props.name}
                type={
                  props.type === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : props.type
                }
                name={props.name}
                placeholder={props.placeholder}
                aria-describedby={`${name}-error`}
                required={props.required}
                value={props.value}
                readOnly={props.value ? true : false}
                {...otherProps}
              />
            </div>
          </div>
          {props.type === 'password' && (
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
