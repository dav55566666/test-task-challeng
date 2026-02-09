import type { IButtonProps } from './interfaces';
import styles from './styles/style.module.scss';

export function Button({
  variant = 'primary',
  fullWidth,
  className = '',
  children,
  ...rest
}: IButtonProps) {
  const classNames = [
    styles.button,
    styles[`button_${variant}`],
    fullWidth ? styles.button_fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classNames} {...rest}>
      {children}
    </button>
  );
}
