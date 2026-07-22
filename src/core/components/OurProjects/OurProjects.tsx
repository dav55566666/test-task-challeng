import { useCallback, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { OUR_PROJECTS, PROJECT_TABS, projectCategoryPath } from "../../data";
import { IMAGES } from "../../design";
import {
  ProjectSplitLayout,
  caseStudyBodyCopyClass,
} from "../ProjectSplitLayout";
import { Tabs } from "../Tabs";
import { ProjectMedia } from "../ProjectMedia";
import { useMaxIntersectionIndex } from "../../hooks";

import "./styles/our-projects.scss";
import { GradientTitle, TextTag } from "../../uikit";

const MOBILE_TABS_STICKY_CLASS =
  "sticky top-[var(--site-header-sticky-height)] z-20 -mx-5 bg-white px-5 pt-2 pb-2 md:mx-0 md:px-0 md:py-2 md:pb-3 md:hidden";

export type OurProjectsProps = {
  limit?: number;
  category?: string;
};

export const OurProjects = ({ limit, category }: OurProjectsProps) => {
  const navigate = useNavigate();
  const showTabs = typeof limit !== "number";
  const figureRefs = useRef<(HTMLElement | null)[]>([]);
  const activeCategory = category ?? PROJECT_TABS[0].value;

  const projects = useMemo(() => {
    const base =
      typeof limit === "number"
        ? OUR_PROJECTS.slice(0, limit)
        : OUR_PROJECTS;
    if (!showTabs) {
      return base;
    }
    return base.filter((p) => p.tabValue === activeCategory);
  }, [activeCategory, limit, showTabs]);

  const count = projects.length;
  const { activeIndex, registerItemRef } = useMaxIntersectionIndex(count);
  /** Пока observer молчит / ratio=0 — всё равно снимаем маску хотя бы с одного кадра. */
  const clearIndex =
    count === 0 ? 0 : Math.min(Math.max(activeIndex ?? 0, 0), count - 1);
  const project = projects.length > 0 ? projects[clearIndex] : undefined;

  const handleTabChange = useCallback(
    (value: string) => {
      navigate(projectCategoryPath(value));
    },
    [navigate]
  );

  return (
    <ProjectSplitLayout
      id="our-projects"
      aria-label="Наши кейсы"
      className={`our-projects__scroll-target ${showTabs ? "pb-5" : ""}`}
      sidebarDesktopOnly={showTabs}
      mobileSticky={
        showTabs
          ? () => (
            <>
              <GradientTitle
                value="Наши кейсы"
                currentSize={36}
                mobileSize={30}
                tag={TextTag.H2}
              />
              <Tabs
                items={PROJECT_TABS}
                activeValue={activeCategory}
                onChange={handleTabChange}
                aria-label="Категории проектов"
              />
            </>
          )
          : false
      }
      mobileStickyClassName={
        showTabs ? MOBILE_TABS_STICKY_CLASS : undefined
      }
      sidebar={() => (
        <>
          <div className="flex flex-col">
            <GradientTitle value="Наши кейсы" currentSize={36} mobileSize={24} tag={TextTag.H2} />
            <div
              className="our-projects__active-copy hidden md:block"
              aria-live="polite"
              aria-atomic="true"
            >
              {project ? (
                <div
                  key={`${project.slug}-${clearIndex}`}
                  className="our-projects__active-copy-content"
                >
                  <h3 className="m-0 mb-5 text-4xl text-[#33333366]">
                    {project.title}
                  </h3>
                  <p className={caseStudyBodyCopyClass}>{project.description}</p>
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
      mainClassName='flex min-w-0 flex-col gap-4'
    >
      {projects.map((item, i) => (
        <article
          key={`${item.title}-${i}`}
          id={`project-${item.slug}`}
          className="our-projects__scroll-target m-0"
        >
          <Link
            to={`/projects/${item.slug}`}
            className={
              "block cursor-pointer rounded-xl no-underline text-inherit outline-none " +
              "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 " +
              "md:rounded-[1.25rem]"
            }
            aria-label={`Открыть кейс: ${item.title}`}
          >
            <figure
              ref={(el) => {
                registerItemRef(i, el);
                figureRefs.current[i] = el;
              }}
              className="relative m-0 overflow-hidden rounded-xl md:rounded-[1.25rem]"
            >
              <ProjectMedia
                src={item.image}
                alt={item.imageAlt}
                width={1200}
                height={675}
                loading={i < 2 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="block h-auto w-full border-0 outline-none"
              />
              <div
                className={`our-projects__figure-wash pointer-events-none absolute inset-0 z-1 hidden rounded-xl md:block md:rounded-[1.25rem]${clearIndex === i ? " is-clear" : ""}`}
                aria-hidden
              />
            </figure>
            <div className="mt-3 flex items-center justify-between gap-3 md:hidden">
              <span className="min-w-0 flex-1 truncate text-lg leading-tight text-[#333333]">
                {item.title}
              </span>
              <ProjectMedia
                src={IMAGES.arrowRightTop}
                alt=""
                width={16}
                height={16}
                loading="lazy"
                className="shrink-0"
              />
            </div>
          </Link>
        </article>
      ))}
    </ProjectSplitLayout>
  );
};
