import { type ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative flex items-center justify-between rounded-full font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-purple hover:bg-purple-light text-white',
    secondary: 'bg-navy-light hover:bg-navy text-slate-light hover:text-slate',
    destructive: 'bg-red hover:bg-red-light text-white',
    outline: 'border border-slate text-slate hover:bg-slate hover:text-white',
    ghost: 'text-slate hover:bg-navy-light',
  };

  const sizes = {
    sm: 'px-4 py-3 body-1',
    md: 'px-6 py-4 body-1',
    lg: 'px-8 py-4 body-1',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
