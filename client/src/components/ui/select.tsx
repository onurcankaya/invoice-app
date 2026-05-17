import { forwardRef, type SelectHTMLAttributes } from 'react';
import iconArrowDown from '@/assets/icon-arrow-down.svg';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className = '', children, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="body-1 block">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={`w-full appearance-none bg-navy border ${
              error ? 'border-red' : 'border-navy-light'
            } rounded px-5 py-4 body-1 font-bold text-white focus:border-purple outline-none cursor-pointer ${className}`}
            {...props}
          >
            {children}
          </select>
          <img
            src={iconArrowDown}
            alt=""
            className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
        {error && <p className="text-red text-xs">{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
