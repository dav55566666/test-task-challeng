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
    value: "helloT@Fabula",
    href: "t.me/fabula_creativecommunity",
  },
  // {
  //   id: "phone",
  //   label: "Телефон",
  //   value: "+7 (598) 532-95-45",
  //   href: "tel:+75985329545",
  // },
  {
    id: "address",
    label: "Адрес",
    value: "г. Москва, ул. Кузнецкий Мост 4/3 стр.1",
  },
  {
    id: "max",
    label: "МАКС",
    value: "Fabula МАКС",
    href: "https://max.ru/join/2XhSuW9rfm9sYjvSLilehiVnC8PGwGaSdD9pFE_2lMQ",
  },
  {
    id: "telegram-2",
    label: "Телеграм",
    value: "Fabula Телеграм",
    href: "https://t.me/fabulacommunity",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "@fabula",
    href: "https://www.linkedin.com/company/fabula/",
  },
];
