export type ProjectGalleryImage = {
  /** Index in the project's `galleryImages` array */
  index: number;
  /** Desktop layout width (1398px grid base) */
  width: number;
  /** Desktop layout height */
  height: number;
};

export type ProjectGalleryRow = {
  images: readonly ProjectGalleryImage[];
};

export type ProjectGalleryLayout = readonly ProjectGalleryRow[];

export const PROJECT_GALLERY_MAX_WIDTH = 1398;
