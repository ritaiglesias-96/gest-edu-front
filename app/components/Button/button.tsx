import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  styling?: 'primary' | 'secondary' | 'pill' | 'link' | 'outline';
}

export default function Button({
  children,
  className,
  styling = 'primary',
  ...rest
}: ButtonProps) {
  const classes = {
    primary: 'btn-primary btn',
    secondary: 'btn-secondary btn',
    pill: 'btn-pill btn',
    link: 'btn-link btn',
    outline: 'btn-outline btn',
  };

  return (
    <button {...rest} className={clsx(classes[styling], className)}>
      {children}
    </button>
  );
}
