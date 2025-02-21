'use client';

import * as React from 'react';
import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error, children, ...props }, ref) => {
    return (
      <select
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          ${className}
          dark:bg-gray-800 dark:border-gray-700 dark:text-white
          disabled:opacity-50 disabled:cursor-not-allowed`}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export { Select }; 