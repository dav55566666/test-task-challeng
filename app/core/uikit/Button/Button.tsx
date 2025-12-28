'use client';
import { IButtonProps } from './interfaces';

const Button = ({
    bgType,
    theme,
    value,
    Icon,
    maxWidth,
    click
}: IButtonProps) => {
  return (
    <button className={`button ${theme} ${bgType}`} onClick={click} style={{maxWidth}}>
        {value}
        {Icon}
    </button>
  )
};

export default Button;