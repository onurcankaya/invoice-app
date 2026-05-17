import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="body-1 block">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full bg-navy border ${
            error ? 'border-red' : 'border-navy-light'
          } rounded px-5 py-4 body-1 text-white font-bold focus:border-purple outline-none ${className}`}
          {...props}
        />
        {error && <p className="text-red text-xs">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
