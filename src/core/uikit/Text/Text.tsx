import type { ITextProps } from './interfaces';
import styles from './styles/style.module.scss';

export function Text({
  variant = 'body',
  as: Component = 'span',
  className = '',
  children,
  ...rest
}: ITextProps) {
  const classNames = [styles.text, styles[`text_${variant}`], className].filter(Boolean).join(' ');
  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
}
