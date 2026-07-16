import { BASE_MEDIA_URL } from "../design";
import { packGalleryLayout } from "./packGalleryLayout";
import { PROJECT_MEDIA_FILES } from "./projectMediaManifest";
import type { ProjectGalleryLayout } from "./projectGalleryTypes";

export type OurProjectCase = {
  slug: string;
  title: string;
  description: string;
  imageAlt: string;
  image: string;
  tabValue: string;
  galleryImages: readonly string[];
  galleryLayout: ProjectGalleryLayout;
};

type ProjectStructureImage = {
  id: number;
  width: number;
  height: number;
};

type ProjectStructure = {
  title: string;
  description: string;
  mainImage: string;
  images: readonly ProjectStructureImage[];
};

const CATEGORY_TO_TAB: Record<string, string> = {
  company: "campaigns",
  soc: "social",
  video: "video",
  ai: "ecommerce",
  brending: "branding",
};

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

const structureModules = import.meta.glob<{ default: ProjectStructure }>(
  "../../assets/projects/*/project*/structure.js",
  { eager: true }
);

function basenameNoExt(filename: string): string {
  return filename.replace(/\.[^.]+$/, "").toLowerCase();
}

function slugifyTitle(title: string): string {
  const lowered = title.trim().toLowerCase();
  let out = "";
  for (const char of lowered) {
    if (CYRILLIC_TO_LATIN[char] != null) {
      out += CYRILLIC_TO_LATIN[char];
      continue;
    }
    if (/[a-z0-9]/.test(char)) {
      out += char;
      continue;
    }
    if (/[\s_.'’"`]+/.test(char) || char === "—" || char === "-" || char === ":") {
      out += "-";
    }
  }
  return out
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64) || "project";
}

type MediaIndex = {
  byId: Map<number, string>;
  byBase: Map<string, string>;
};

function projectMediaUrl(projectKey: string, file: string): string {
  return `${BASE_MEDIA_URL}/projects/${projectKey}/${file}`;
}

function buildMediaIndex(projectKey: string): MediaIndex {
  const byId = new Map<number, string>();
  const byBase = new Map<string, string>();

  for (const entry of PROJECT_MEDIA_FILES[projectKey] ?? []) {
    const url = projectMediaUrl(projectKey, entry.file);
    byId.set(entry.id, url);
    byBase.set(basenameNoExt(entry.file), url);
  }

  return { byId, byBase };
}

function parseProjectKey(structurePath: string): {
  category: string;
  folder: string;
} | null {
  const normalized = structurePath.replace(/\\/g, "/");
  const match = normalized.match(
    /assets\/projects\/([^/]+)\/(project[^/]+)\/structure\.js$/
  );
  if (!match) return null;
  return { category: match[1], folder: match[2] };
}

function buildProjects(): OurProjectCase[] {
  const usedSlugs = new Set<string>();
  const projects: OurProjectCase[] = [];

  const entries = Object.entries(structureModules).sort(([a], [b]) =>
    a.localeCompare(b, "en", { numeric: true })
  );

  for (const [structurePath, mod] of entries) {
    const parsed = parseProjectKey(structurePath);
    if (!parsed) continue;

    const structure = mod.default;
    if (!structure?.images?.length) continue;

    const tabValue = CATEGORY_TO_TAB[parsed.category];
    if (!tabValue) continue;

    const projectKey = `${parsed.category}/${parsed.folder}`;
    const media = buildMediaIndex(projectKey);
    const galleryItems: { src: string; width: number; height: number }[] = [];

    for (const image of structure.images) {
      const src = media.byId.get(image.id);
      if (!src) {
        console.warn(
          `[projects] Missing media for ${projectKey} id=${image.id}`
        );
        continue;
      }
      galleryItems.push({
        src,
        width: image.width,
        height: image.height,
      });
    }

    if (galleryItems.length === 0) continue;

    const mainBase = basenameNoExt(structure.mainImage);
    const cover =
      media.byBase.get(mainBase) ??
      media.byId.get(1) ??
      galleryItems[0].src;

    let slug = slugifyTitle(structure.title);
    if (usedSlugs.has(slug)) {
      slug = `${slug}-${parsed.folder.replace(/^project/i, "")}`;
    }
    if (usedSlugs.has(slug)) {
      slug = `${slug}-${parsed.category}`;
    }
    usedSlugs.add(slug);

    projects.push({
      slug,
      title: structure.title.trim(),
      description: structure.description.trim(),
      imageAlt: structure.title.trim(),
      image: cover,
      tabValue,
      galleryImages: galleryItems.map((item) => item.src),
      galleryLayout: packGalleryLayout(galleryItems),
    });
  }

  return projects;
}

export const OUR_PROJECTS: readonly OurProjectCase[] = buildProjects();
