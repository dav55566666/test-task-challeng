import type { HTMLAttributes } from 'react';

export type TextVariantType = 'body' | 'caption' | 'title' | 'subtitle';

export interface ITextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariantType;
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
}
