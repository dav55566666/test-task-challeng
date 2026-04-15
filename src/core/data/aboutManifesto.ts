export type AboutManifestoLine = {
  text: string;
  maxRem: number;
};

export type AboutManifestoParagraph = readonly AboutManifestoLine[];

export const ABOUT_MANIFESTO_PARAGRAPHS: readonly AboutManifestoParagraph[] = [
  [
    { text: "Мы верим, что современные маркетинговые", maxRem: 70 },
    { text: "и коммуникационные вызовы нужно решать единой", maxRem: 90 },
    { text: "командой, обогащённой профильными талантами.", maxRem: 80 },
  ],
  [
    { text: "Для большей эффективности, мы оставили творческое", maxRem: 80 },
    { text: "людям и передали операционные процессы разработанной", maxRem: 80 },
    { text: "ИИ-инфраструктуре.", maxRem: 40 },
  ],
];

export const ABOUT_MANIFESTO_BULLETS = [
  "Радуем TOP-рекламодателей более 20 лет",
  "Гармонируем школу сетевых агентств и современных творческих деятелей",
  "Реализуем амбиции: многократные призёры российских и международных фестивалей",
  "Развиваем индустрию академически и практически: ВШЭ, МГИМО, FERMA и другие",
] as const;

export type AboutStat = {
  value: string;
  label: string;
};

export const ABOUT_STATS: readonly AboutStat[] = [
  { value: "230+", label: "международных и российских брендов" },
  { value: "7+ лет", label: "на рынке" },
  { value: "900+", label: "реализованных стратегий и активаций" },
  { value: "23+", label: "Российских и международных наград у команды" },
  { value: "16+", label: "членов интегрированной команды" },
];
