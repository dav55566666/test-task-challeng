import { IMAGES } from "../design";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  imageAlt: string;
};

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: "max-smirnov",
    name: "Макс Смирнов",
    role: "CEO Fabula",
    bio: "Для большей эффективности, мы оставили творческое людям и передали операционные процессы разработанной ИИ-инфраструктуре.",
    imageSrc: IMAGES.person1,
    imageAlt: "Макс Смирнов",
  },
  {
    id: "kirill-zhukov-1",
    name: "Кирилл Жуков",
    role: "CEO Fabula",
    bio: "Мы верим, что современные маркетинговые и коммуникационные вызовы нужно решать единой командой, обогащённой профильными талантами.",
    imageSrc: IMAGES.person2,
    imageAlt: "Кирилл Жуков в худи Fabula",
  },
  {
    id: "kirill-zhukov-2",
    name: "Кирилл Жуков",
    role: "CEO Fabula",
    bio: "Для большей эффективности, мы оставили творческое людям и передали операционные процессы разработанной ИИ-инфраструктуре.",
    imageSrc: IMAGES.person3,
    imageAlt: "Кирилл Жуков в костюме Fabula",
  },
];

export const ABOUT_HERO_HEADLINE =
  "Мы не довольствуемся привычным, вот за что нас любят";
