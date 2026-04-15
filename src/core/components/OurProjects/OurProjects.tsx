import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";

import { useProjectsUiStore } from "../../../store";
import { OUR_PROJECTS } from "../../data";
import { IMAGES } from "../../design";
import {
  ProjectSplitLayout,
  ProjectSplitPrompt,
  caseStudyBodyCopyClass,
} from "../ProjectSplitLayout";
import { Tabs, type TabItem } from "../Tabs";
import { useMaxIntersectionIndex } from "../../hooks";

import "./styles/our-projects.scss";
import { GradientTitle, TextTag } from "../../uikit";

const PROJECT_TABS: TabItem[] = [
  { label: "Кампании", value: "campaigns" },
  { label: "Социальные сети", value: "social" },
  { label: "Брендинг", value: "branding" },
  { label: "Видеопродакшн", value: "video" },
  { label: "E-commerce", value: "ecommerce" },
];

const MOBILE_TABS_STICKY_CLASS =
  "sticky top-[var(--site-header-sticky-height)] z-20 -mx-5 bg-white px-5 pt-2 pb-2 md:mx-0 md:px-0 md:py-2 md:pb-3 md:hidden";

const DESKTOP_TABS_STICKY_CLASS =
  "sticky top-[var(--site-header-sticky-height)] z-20 bg-white py-2 pb-3 shadow-[0_1px_0_0_rgb(0_0_0/.06)]";

export type OurProjectsProps = {
  limit?: number;
};

export const OurProjects = ({ limit }: OurProjectsProps) => {
  const showTabs = typeof limit !== "number";
  const figureRefs = useRef<(HTMLElement | null)[]>([]);
  const casesActiveTab = useProjectsUiStore((s) => s.casesActiveTab);
  const setCasesActiveTab = useProjectsUiStore((s) => s.setCasesActiveTab);

  const projects = useMemo(() => {
    if (typeof limit === "number") {
      return OUR_PROJECTS.slice(0, limit);
    }
    return OUR_PROJECTS;
  }, [limit]);

  const count = projects.length;
  const { activeIndex, registerItemRef } = useMaxIntersectionIndex(count);
  const projectIndex = activeIndex ?? 0;
  const project =
    projects.length > 0
      ? (projects[projectIndex] ?? projects[0])
      : undefined;

  const scrollSyncedTab =
    projects[activeIndex ?? 0]?.tabValue ?? PROJECT_TABS[0].value;

  useLayoutEffect(() => {
    if (!showTabs) return;
    setCasesActiveTab(scrollSyncedTab);
  }, [showTabs, scrollSyncedTab, setCasesActiveTab]);

  const handleTabChange = useCallback(
    (value: string) => {
      setCasesActiveTab(value);
      const idx = projects.findIndex((p) => p.tabValue === value);
      if (idx < 0) return;
      figureRefs.current[idx]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [projects, setCasesActiveTab]
  );

  return (
    <ProjectSplitLayout
      aria-label="Наши проекты"
      className="pb-5"
      sidebarDesktopOnly={showTabs}
      mobileSticky={
        showTabs
          ? () => (
            <>
              <h2 className="mb-3 text-4xl md:hidden">Наши проекты</h2>
              <Tabs
                items={PROJECT_TABS}
                activeValue={casesActiveTab}
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
            {showTabs ? (
              <GradientTitle value="Наши проекты" currentSize={36} mobileSize={24} tag={TextTag.H2} />
            ) : (
              <h2 className="text-4xl">Наши проекты</h2>
            )}
            <div
              className="our-projects__active-copy hidden md:block"
              aria-live="polite"
              aria-atomic="true"
            >
              {project ? (
                <>
                  <h3 className="m-0 mb-5 text-4xl text-[#33333366]">
                    {project.title}
                  </h3>
                  <p className={caseStudyBodyCopyClass}>{project.description}</p>
                </>
              ) : null}
            </div>
          </div>
          <ProjectSplitPrompt className="hidden md:mt-0" />
        </>
      )}
      mainClassName={
        showTabs
          ? "flex min-w-0 flex-col gap-6 md:gap-5 md:pr-32"
          : "flex min-w-0 flex-col gap-6 md:gap-5"
      }
    >
      {showTabs ? (
        <div
          className={`hidden min-w-0 md:block ${DESKTOP_TABS_STICKY_CLASS}`}
        >
          <Tabs
            items={PROJECT_TABS}
            activeValue={casesActiveTab}
            onChange={handleTabChange}
            aria-label="Категории проектов"
          />
        </div>
      ) : null}
      {projects.map((item, i) => (
        <article key={`${item.title}-${i}`} className="m-0">
          <Link
            to={`/projects/${item.slug}`}
            className={
              "block rounded-xl no-underline text-inherit outline-none " +
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
              className="relative m-0 overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(15,23,42,0.08)] md:rounded-[1.25rem]"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                width={1200}
                height={675}
                loading={i < 2 ? "eager" : "lazy"}
                className="block h-auto w-full"
              />
              <div
                className={`our-projects__figure-wash pointer-events-none absolute inset-0 z-1 hidden rounded-xl md:block md:rounded-[1.25rem]${activeIndex === i ? " is-clear" : ""}`}
                aria-hidden
              />
            </figure>
            <div className="mt-3 flex items-center justify-between gap-3 md:hidden">
              <span className="min-w-0 flex-1 truncate text-lg leading-tight text-[#333333]">
                {item.title}
              </span>
              <img
                src={IMAGES.arrowRightTop}
                alt=""
                width={16}
                height={16}
                className="shrink-0"
                aria-hidden
              />
            </div>
          </Link>
        </article>
      ))}
    </ProjectSplitLayout>
  );
};
