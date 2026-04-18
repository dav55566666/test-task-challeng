/**
 * Замена `enum` под `erasableSyntaxOnly`: числовые значения как раньше (0…5).
 */
export const IconsName = {
  HOME_ICON: 0,
  ABOUT_US_ICON: 1,
  CASES_ICON: 2,
  CONTACTS_ICON: 3,
  SERVICES_ICON: 4,
  LOGO_ICON: 5,
  TG_ICON: 6,
  LINKEDIN_ICON: 7,
  BURGER_ICON: 8,
  ARROW_ICON: 9,
} as const;

export type IconsName = (typeof IconsName)[keyof typeof IconsName];
