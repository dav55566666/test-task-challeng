export const ApplicationListTagEnum = {
  LIST: 'ul',
} as const;

export type ApplicationListTagEnumType = (typeof ApplicationListTagEnum)[keyof typeof ApplicationListTagEnum];
