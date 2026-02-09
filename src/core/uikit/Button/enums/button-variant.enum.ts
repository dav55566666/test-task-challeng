export const ButtonVariantEnum = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
} as const;

export type ButtonVariantEnumType = (typeof ButtonVariantEnum)[keyof typeof ButtonVariantEnum];
