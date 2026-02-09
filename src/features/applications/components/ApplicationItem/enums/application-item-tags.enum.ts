export const ApplicationItemTagEnum = {
  CARD: 'article',
} as const;

export type ApplicationItemTagEnumType = (typeof ApplicationItemTagEnum)[keyof typeof ApplicationItemTagEnum];
