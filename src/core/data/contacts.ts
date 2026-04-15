export type ContactRow = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export const CONTACT_ROWS: readonly ContactRow[] = [
  {
    id: "email",
    label: "Электронная почта",
    value: "hello@fabula.ru",
    href: "mailto:hello@fabula.ru",
  },
  {
    id: "telegram",
    label: "Телеграм",
    value: "@fabula",
    href: "https://t.me/fabula",
  },
  {
    id: "phone",
    label: "Телефон",
    value: "+7 (598) 532-95-45",
    href: "tel:+75985329545",
  },
  {
    id: "address",
    label: "Адрес",
    value: "Москва, ул. Ладо Кецховели 22а, офис 801",
    href: "https://yandex.ru/maps/?text=Москва%2C%20ул.%20Ладо%20Кецховели%2022а",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@fabula",
    href: "https://instagram.com/fabula",
  },
  {
    id: "telegram-2",
    label: "Телеграм",
    value: "@fabula",
    href: "https://t.me/fabula",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "@fabula",
    href: "https://www.linkedin.com/company/fabula/",
  },
];
