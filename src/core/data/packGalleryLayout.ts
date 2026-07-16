import {
  PROJECT_GALLERY_MAX_WIDTH,
  type ProjectGalleryImage,
  type ProjectGalleryLayout,
  type ProjectGalleryRow,
} from "./projectGalleryTypes";

export type GallerySize = {
  width: number;
  height: number;
};

/**
 * Pack ordered gallery items into rows for the ~1398px design grid.
 * Widths are approximate: a row is considered full when the sum is within
 * a small tolerance of the max width (e.g. 464×3 = 1392).
 */
export function packGalleryLayout(
  items: readonly GallerySize[],
  maxWidth = PROJECT_GALLERY_MAX_WIDTH,
  tolerance = 24
): ProjectGalleryLayout {
  const rows: ProjectGalleryRow[] = [];
  let current: ProjectGalleryImage[] = [];
  let sum = 0;

  const flush = () => {
    if (current.length === 0) return;
    rows.push({ images: current });
    current = [];
    sum = 0;
  };

  items.forEach((item, index) => {
    const width = Math.min(Math.max(item.width, 1), maxWidth);
    const height = Math.max(item.height, 1);

    if (current.length > 0 && sum + width > maxWidth + tolerance) {
      flush();
    }

    current.push({ index, width, height });
    sum += width;

    if (sum >= maxWidth - tolerance) {
      flush();
    }
  });

  flush();
  return rows;
}
