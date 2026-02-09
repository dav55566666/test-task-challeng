export const PaginationButtonTypeEnum = {
  PREV: 'prev',
  NEXT: 'next',
  PAGE: 'page',
} as const;

export type PaginationButtonTypeEnumType = (typeof PaginationButtonTypeEnum)[keyof typeof PaginationButtonTypeEnum];
