import { IMAGES } from "../design";

export type OurProjectCase = {
  slug: string;
  title: string;
  description: string;
  imageAlt: string;
  image: string;
  tabValue: string;
};

export const OUR_PROJECTS: readonly OurProjectCase[] = [
  {
    slug: "goldn-apotheka",
    title: "Gold'n Apotheka",
    description:
      "Соединили правила двух миров: перевели фарм-код на язык лайфстайл. В супер конкурентной категории превратили брендбилдинг из стратегии в реальность: от дизайна упаковки — к громкому ивенту, стримам и экспертному контенту, кулинарным шоу.",
    imageAlt: "Gold'n Apotheka",
    image: IMAGES.project1,
    tabValue: "campaigns",
  },
  {
    slug: "project-2",
    title: "Второй проект",
    description:
      "Краткое описание второго кейса: задача, решение и результат. Замените этот текст на реальную историю проекта, когда будет готов материал.",
    imageAlt: "Второй проект",
    image: IMAGES.project2,
    tabValue: "social",
  },
  {
    slug: "project-3",
    title: "Третий проект",
    description:
      "Краткое описание третьего кейса: задача, решение и результат. Замените этот текст на реальную историю проекта, когда будет готов материал.",
    imageAlt: "Третий проект",
    image: IMAGES.project3,
    tabValue: "branding",
  },
  {
    slug: "project-4",
    title: "Четвёртый проект",
    description:
      "Краткое описание четвёртого кейса: задача, решение и результат. Замените этот текст на реальную историю проекта, когда будет готов материал.",
    imageAlt: "Четвёртый проект",
    image: IMAGES.project1,
    tabValue: "video",
  },
  {
    slug: "project-5",
    title: "Пятый проект",
    description:
      "Краткое описание пятого кейса: задача, решение и результат. Замените этот текст на реальную историю проекта, когда будет готов материал.",
    imageAlt: "Пятый проект",
    image: IMAGES.project2,
    tabValue: "ecommerce",
  },
];
