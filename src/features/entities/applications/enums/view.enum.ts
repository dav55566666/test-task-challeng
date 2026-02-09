export const ViewEnum = {
  MY: 'my',
  OTHER: 'other',
} as const;

export type ViewEnumType = (typeof ViewEnum)[keyof typeof ViewEnum];
