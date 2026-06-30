import { useCallback, useState, type CSSProperties } from "react";

import { ProjectMedia } from "../../components/ProjectMedia";
import { VideoPlayerModal } from "../../components/VideoPlayerModal";
import {
  PROJECT_GALLERY_MAX_WIDTH,
  type ProjectGalleryLayout,
} from "../../data/projectGalleryTypes";

const FIGURE_CLASS =
  "relative m-0 min-w-0 overflow-hidden rounded-xl md:rounded-[1.25rem]";

const MEDIA_CLASS =
  "block h-full w-full border-0 bg-[#f7f7f7] object-cover outline-none";

type ProjectGalleryProps = {
  images: readonly string[];
  layout: ProjectGalleryLayout;
  primaryAlt: string;
  title: string;
};

function getFlexBasis(width: number): string {
  return `${(width / PROJECT_GALLERY_MAX_WIDTH) * 100}%`;
}

export function ProjectGallery({
  images,
  layout,
  primaryAlt,
  title,
}: ProjectGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const handleVideoClick = useCallback(
    (payload: { src: string; alt: string }) => {
      setActiveVideo(payload);
    },
    []
  );
  const handleCloseVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  let imageCounter = 0;

  return (
    <>
    <div className="flex min-w-0 flex-col gap-5 md:gap-5">
      {layout.map((row, rowIndex) => {
        const isMultiColumn = row.images.length > 1;

        return (
          <div
            key={`row-${rowIndex}`}
            className={
              isMultiColumn
                ? "flex min-w-0 flex-col gap-5 md:flex-row md:gap-5"
                : "flex min-w-0"
            }
          >
            {row.images.map((item) => {
              const src = images[item.index];
              const altIndex = imageCounter;
              imageCounter += 1;

              const isPartialWidth =
                !isMultiColumn && item.width < PROJECT_GALLERY_MAX_WIDTH;

              const figureStyle: CSSProperties = {
                aspectRatio: `${item.width} / ${item.height}`,
              };

              const styleVars: Record<string, string> = {};

              if (isMultiColumn) {
                styleVars["--gallery-flex"] = `${item.width} 1 0`;
              }

              if (isPartialWidth) {
                styleVars["--gallery-width"] = getFlexBasis(item.width);
              }

              return (
                <figure
                  key={`${src}-${item.index}`}
                  className={
                    FIGURE_CLASS +
                    " w-full" +
                    (isMultiColumn ? " md:[flex:var(--gallery-flex)]" : "") +
                    (isPartialWidth ? " md:w-[var(--gallery-width)]" : "")
                  }
                  style={{ ...figureStyle, ...styleVars }}
                >
                  <ProjectMedia
                    src={src}
                    alt={
                      altIndex === 0
                        ? primaryAlt
                        : `${title} — изображение ${altIndex + 1}`
                    }
                    width={item.width}
                    height={item.height}
                    loading={altIndex < 2 ? "eager" : "lazy"}
                    className={MEDIA_CLASS}
                    onVideoClick={handleVideoClick}
                  />
                </figure>
              );
            })}
          </div>
        );
      })}
    </div>
    <VideoPlayerModal
      isOpen={activeVideo !== null}
      onClose={handleCloseVideo}
      src={activeVideo?.src ?? ""}
      ariaLabel={activeVideo?.alt ?? "Видео проекта"}
    />
    </>
  );
}
