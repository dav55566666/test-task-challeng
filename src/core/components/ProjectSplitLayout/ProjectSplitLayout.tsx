import type { ReactNode } from "react";

const SHELL =
  "flex flex-col gap-6 px-4 pt-3 md:grid md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-start";

const MOBILE_STICKY_DEFAULT =
  "sticky top-[var(--site-header-sticky-height)] z-10 -mx-5 bg-white px-5 py-3 md:hidden";

const DESKTOP_SIDEBAR_BASE =
  "relative w-full min-w-0 max-w-none flex-col self-start md:sticky md:top-[var(--site-header-sticky-height)] md:z-10 md:max-w-xs md:pb-2";

/** Sidebar hidden on small screens (mobile sticky / alternate top bar shows instead). */
const DESKTOP_SIDEBAR_MD_ONLY = `${DESKTOP_SIDEBAR_BASE} hidden md:flex`;

/** Sidebar visible on all breakpoints (e.g. list without tabs). */
const DESKTOP_SIDEBAR_ALWAYS = `${DESKTOP_SIDEBAR_BASE} flex`;

const MAIN_DEFAULT = "min-w-0";

/** Shared body style for case-study / product copy blocks */
export const caseStudyBodyCopyClass =
  "m-0 w-full text-[15px] leading-tight font-light text-[#33333366] mt-4";

export type ProjectSplitLayoutProps = {
  /** Root element `id` (e.g. in-page anchors). */
  id?: string;
  /** Left column on desktop (sticky). Also used in the mobile sticky bar unless `mobileSticky` is `false`. */
  sidebar: () => ReactNode;
  /**
   * `false` — no mobile sticky strip.
   * `function` — custom mobile sticky content (e.g. title + tabs).
   * `undefined` — reuse `sidebar` in the mobile sticky bar.
   */
  mobileSticky?: false | (() => ReactNode);
  /** Main / gallery column */
  children: ReactNode;
  as?: "section" | "main";
  "aria-label"?: string;
  /** Added to the outer shell (e.g. `pb-5`, `pb-10`) */
  className?: string;
  /** Override mobile sticky wrapper classes (default includes shadow). */
  mobileStickyClassName?: string;
  /** Classes for the main column wrapper (default `min-w-0`). */
  mainClassName?: string;
  /**
   * When true (default), sidebar is `hidden md:flex` — use with a mobile sticky bar or duplicate top UI.
   * When false, sidebar shows on mobile too (e.g. project list without category tabs).
   */
  sidebarDesktopOnly?: boolean;
};

export function ProjectSplitLayout({
  id,
  sidebar,
  mobileSticky,
  children,
  as: Tag = "section",
  "aria-label": ariaLabel,
  className,
  mobileStickyClassName,
  mainClassName,
  sidebarDesktopOnly = true,
}: ProjectSplitLayoutProps) {
  const shellClass = [SHELL, className].filter(Boolean).join(" ");
  const mobileStickyClass = mobileStickyClassName ?? MOBILE_STICKY_DEFAULT;
  const mainClass = [MAIN_DEFAULT, mainClassName].filter(Boolean).join(" ");
  const desktopSidebarClass = sidebarDesktopOnly
    ? DESKTOP_SIDEBAR_MD_ONLY
    : DESKTOP_SIDEBAR_ALWAYS;

  const renderMobileStickyContent =
    typeof mobileSticky === "function" ? mobileSticky : sidebar;

  return (
    <Tag
      id={id}
      className={shellClass}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {mobileSticky !== false ? (
        <div className={mobileStickyClass}>{renderMobileStickyContent()}</div>
      ) : null}

      <div className={desktopSidebarClass}>{sidebar()}</div>

      <div className={mainClass}>{children}</div>
    </Tag>
  );
}
