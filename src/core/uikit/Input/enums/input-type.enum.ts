export const InputTypeEnum = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  CHECKBOX: 'checkbox',
} as const;

export type InputTypeEnumType = (typeof InputTypeEnum)[keyof typeof InputTypeEnum];
