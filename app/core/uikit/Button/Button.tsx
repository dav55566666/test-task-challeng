'use client';
import { IButtonProps } from './interfaces';

const Button = ({
    bgType,
    theme,
    value,
    Icon,
    click
}: IButtonProps) => {
  return (
    <button className={`button ${theme} ${bgType}`} onClick={click}>
        {value}
        {Icon}
    </button>
  )
};

export default Button;