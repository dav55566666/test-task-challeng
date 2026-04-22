import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { useProjectsUiStore } from "../../../store";
import { OUR_PROJECTS, PROJECT_TABS } from "../../data";
import { IMAGES } from "../../design";
import {
  ProjectSplitLayout,
  ProjectSplitPrompt,
  caseStudyBodyCopyClass,
} from "../ProjectSplitLayout";
import { Tabs } from "../Tabs";
import { useMaxIntersectionIndex } from "../../hooks";

import "./styles/our-projects.scss";
import { GradientTitle, TextTag } from "../../uikit";

const MOBILE_TABS_STICKY_CLASS =
  "sticky top-[var(--site-header-sticky-height)] z-20 -mx-5 bg-white px-5 pt-2 pb-2 md:mx-0 md:px-0 md:py-2 md:pb-3 md:hidden";

export type OurProjectsProps = {
  limit?: number;
};

export const OurProjects = ({ limit }: OurProjectsProps) => {
  const location = useLocation();
  const showTabs = typeof limit !== "number";
  const figureRefs = useRef<(HTMLElement | null)[]>([]);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);
  const programmaticScrollTabRef = useRef<string | null>(null);
  const casesActiveTab = useProjectsUiStore((s) => s.casesActiveTab);
  const setCasesActiveTab = useProjectsUiStore((s) => s.setCasesActiveTab);
  const setScrollToCaseByTab = useProjectsUiStore((s) => s.setScrollToCaseByTab);
  const setCasesListActiveSlug = useProjectsUiStore(
    (s) => s.setCasesListActiveSlug
  );

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
    const pending = programmaticScrollTabRef.current;
    if (pending !== null && scrollSyncedTab !== pending) return;
    if (pending !== null && scrollSyncedTab === pending) {
      programmaticScrollTabRef.current = null;
    }
    setCasesActiveTab(scrollSyncedTab);
  }, [showTabs, scrollSyncedTab, setCasesActiveTab]);

  useLayoutEffect(() => {
    if (!showTabs) return;
    const slug = projects[activeIndex ?? 0]?.slug;
    if (slug) setCasesListActiveSlug(slug);
  }, [showTabs, activeIndex, projects, setCasesListActiveSlug]);

  useLayoutEffect(() => {
    if (typeof limit !== "number") return;
    const raw = location.hash.replace(/^#/, "");
    if (!raw.startsWith("project-")) return;

    const scrollToTarget = () => {
      const behavior: ScrollBehavior = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth";
      const el = document.getElementById(raw);
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
        return;
      }
      document.getElementById("our-projects")?.scrollIntoView({
        behavior,
        block: "start",
      });
    };

    scrollToTarget();
    const t = window.setTimeout(scrollToTarget, 120);
    return () => window.clearTimeout(t);
  }, [limit, location.pathname, location.hash]);

  const scrollListToTab = useCallback((value: string) => {
    const idx = projects.findIndex((p) => p.tabValue === value);
    if (idx < 0) return;
    programmaticScrollTabRef.current = value;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    articleRefs.current[idx]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }, [projects]);

  useLayoutEffect(() => {
    if (!showTabs) {
      setScrollToCaseByTab(null);
      return;
    }
    setScrollToCaseByTab(scrollListToTab);
    return () => setScrollToCaseByTab(null);
  }, [scrollListToTab, setScrollToCaseByTab, showTabs]);

  const handleTabChange = useCallback(
    (value: string) => {
      setCasesActiveTab(value);
      scrollListToTab(value);
    },
    [scrollListToTab, setCasesActiveTab]
  );

  return (
    <ProjectSplitLayout
      id="our-projects"
      aria-label="Наши проекты"
      className={`our-projects__scroll-target ${showTabs ? "pb-5" : ""}`}
      sidebarDesktopOnly={showTabs}
      mobileSticky={
        showTabs
          ? () => (
            <>
              <GradientTitle
                value="Наши проекты"
                currentSize={36}
                mobileSize={30}
                tag={TextTag.H2}
              />
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
            <GradientTitle value="Наши проекты" currentSize={36} mobileSize={24} tag={TextTag.H2} />
            <div
              className="our-projects__active-copy hidden md:block"
              aria-live="polite"
              aria-atomic="true"
            >
              {project ? (
                <div
                  key={`${project.slug}-${projectIndex}`}
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
          <ProjectSplitPrompt className="hidden md:mt-0" />
        </>
      )}
      mainClassName='flex min-w-0 flex-col gap-4'
    >
      {projects.map((item, i) => (
        <article
          key={`${item.title}-${i}`}
          id={`project-${item.slug}`}
          ref={(el) => {
            articleRefs.current[i] = el;
          }}
          className="our-projects__scroll-target m-0"
        >
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
              className="relative m-0 overflow-hidden rounded-xl md:rounded-[1.25rem]"
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
