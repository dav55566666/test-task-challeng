import { useId } from 'react';
import type { IInputProps } from './interfaces';
import styles from './styles/style.module.scss';

export function Input({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  type = 'text',
  ...rest
}: IInputProps) {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId.replace(/:/g, '')}`;
  const wrapperClass = [styles.inputWrapper, fullWidth ? styles.inputWrapper_fullWidth : '', className]
    .filter(Boolean)
    .join(' ');
  const inputClass = [styles.input, error ? styles.input_error : ''].filter(Boolean).join(' ');

  if (type === 'checkbox') {
    return (
      <div className={wrapperClass}>
        <label htmlFor={inputId} className={styles.inputLabel} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input id={inputId} type="checkbox" className={inputClass} {...rest} />
          {label}
        </label>
        {error && <span className={styles.inputError}>{error}</span>}
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className={styles.inputLabel}>
          {label}
        </label>
      )}
      <input id={inputId} type={type} className={inputClass} {...rest} />
      {error && <span className={styles.inputError}>{error}</span>}
    </div>
  );
}
