export const TextTagEnum = {
  SPAN: 'span',
  P: 'p',
  DIV: 'div',
} as const;

export type TextTagEnumType = (typeof TextTagEnum)[keyof typeof TextTagEnum];
