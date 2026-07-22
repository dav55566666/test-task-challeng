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

/**
 * Flex-grow uses design widths so proportions stay relative to the 1398 grid.
 * CSS gap sits outside the flex basis; items shrink evenly and keep the ratio.
 */
function getFlexGrow(width: number): string {
  return `${width} 1 0%`;
}

function getWidthPercent(width: number): string {
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
      <div className="flex min-w-0 flex-col gap-2.5 md:gap-5">
        {layout.map((row, rowIndex) => {
          const isMultiColumn = row.images.length > 1;

          return (
            <div
              key={`row-${rowIndex}`}
              className={
                isMultiColumn
                  ? "flex min-w-0 flex-row gap-2.5 md:gap-5"
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
                  styleVars["--gallery-flex"] = getFlexGrow(item.width);
                }

                if (isPartialWidth) {
                  styleVars["--gallery-width"] = getWidthPercent(item.width);
                }

                return (
                  <figure
                    key={`${src}-${item.index}`}
                    className={
                      FIGURE_CLASS +
                      (isMultiColumn
                        ? " [flex:var(--gallery-flex)]"
                        : isPartialWidth
                          ? " w-[var(--gallery-width)] max-w-full"
                          : " w-full")
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
                    fetchPriority={altIndex === 0 ? "high" : "auto"}
                    className={MEDIA_CLASS}
                    onVideoClick={handleVideoClick}
                    visuallyHidden={activeVideo?.src === src}
                  />
                  </figure>
                );
              })}
            </div>
          );
        })}
      </div>
    {activeVideo ? (
      <VideoPlayerModal
        isOpen
        onClose={handleCloseVideo}
        src={activeVideo.src}
        ariaLabel={activeVideo.alt}
      />
    ) : null}
    </>
  );
}
