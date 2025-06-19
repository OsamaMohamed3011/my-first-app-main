'use client';

import { useTranslations } from 'next-intl';

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select';
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
}

export default function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  disabled = false,
  options = [],
  placeholder,
  min,
  max,
  className = ''
}: FormFieldProps) {
  const t = useTranslations('form');

  const baseInputClasses = "w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-1 text-text-dark";
  const enabledClasses = "border-success-main focus:border-info-dark";
  const disabledClasses = "border-secondary-main bg-secondary-light cursor-not-allowed";

  const inputClasses = `${baseInputClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={inputClasses}
          >
            <option value="">{t(`select${name.charAt(0).toUpperCase() + name.slice(1)}`)}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            placeholder={placeholder}
            className={inputClasses}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            className={inputClasses}
          />
        );

      case 'tel':
        return (
          <input
            type="tel"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            className={inputClasses}
          />
        );

      default:
        return (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div>
      <label className={`block text-sm font-medium mb-1 rtl:text-right ${disabled ? 'text-secondary-main' : 'text-text-dark'}`}>
        {label}
      </label>
      {renderInput()}
    </div>
  );
} 