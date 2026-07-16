import { OUR_PROJECTS } from "../data/ourProjectsData";

/**
 * Cover + gallery URLs keyed by project slug (derived from structure.js assets).
 */
export const PROJECT_ASSETS = Object.fromEntries(
  OUR_PROJECTS.map((project) => [
    project.slug,
    {
      cover: project.image,
      gallery: project.galleryImages,
    },
  ])
) as Readonly<
  Record<string, { cover: string; gallery: readonly string[] }>
>;
