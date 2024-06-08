import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  styling: 'primary' | 'secondary' | 'pill' | 'link' | 'outline';
}

export default function Button(props: Readonly<ButtonProps>) {
  const classes = {
    primary: 'btn-primary btn',
    secondary: 'btn-secondary btn',
    pill: 'btn-pill btn',
    link: 'btn-link',
    outline: 'btn-outline btn',
  };

  return (
    <button
      {...props}
      className={clsx(classes[props.styling], props.className)}
    >
      {props.children}
    </button>
  );
}
