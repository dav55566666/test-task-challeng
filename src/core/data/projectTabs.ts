import { OUR_PROJECTS } from "./ourProjectsData";

export type ProjectTabItem = {
  label: string;
  value: string;
};

export const PROJECT_TABS: ProjectTabItem[] = [
  { label: "Кампании", value: "campaigns" },
  { label: "Социальные сети", value: "social" },
  { label: "Видеопродакшн", value: "video" },
  { label: "ИИ-продукты", value: "ecommerce" },
  { label: "Брендинг", value: "branding" },
];

export const DEFAULT_PROJECT_CATEGORY = PROJECT_TABS[0].value;

const PROJECT_CATEGORY_SET = new Set(PROJECT_TABS.map((tab) => tab.value));

export function isProjectCategory(value: string): boolean {
  return PROJECT_CATEGORY_SET.has(value);
}

export function projectCategoryPath(category: string): string {
  return `/projects/${category}`;
}

export function getActiveProjectCategory(pathname: string): string {
  const match = pathname.match(/^\/projects\/([^/]+)$/);
  if (!match) {
    return DEFAULT_PROJECT_CATEGORY;
  }

  const segment = match[1];
  if (isProjectCategory(segment)) {
    return segment;
  }

  const project = OUR_PROJECTS.find((item) => item.slug === segment);
  return project?.tabValue ?? DEFAULT_PROJECT_CATEGORY;
}
