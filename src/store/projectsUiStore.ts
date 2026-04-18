import { create } from "zustand";

/** Matches the first tab in `OurProjects` / `PROJECT_TABS`. */
const DEFAULT_CASES_TAB = "campaigns";

const noopScrollToTab = () => {};

export type ProjectsUiState = {
  /** Active category tab on the full cases list (`/projects`). */
  casesActiveTab: string;
  setCasesActiveTab: (value: string) => void;
  /** Scroll list to first case for tab; registered by `OurProjects` when list is mounted. */
  scrollToCaseByTab: (value: string) => void;
  setScrollToCaseByTab: (fn: ((value: string) => void) | null) => void;
  /** Case card most in view on `/projects` (for “Главная” deep-link). */
  casesListActiveSlug: string | null;
  setCasesListActiveSlug: (slug: string | null) => void;
};

export const useProjectsUiStore = create<ProjectsUiState>((set) => ({
  casesActiveTab: DEFAULT_CASES_TAB,
  setCasesActiveTab: (value) => set({ casesActiveTab: value }),
  scrollToCaseByTab: noopScrollToTab,
  setScrollToCaseByTab: (fn) =>
    set({ scrollToCaseByTab: fn ?? noopScrollToTab }),
  casesListActiveSlug: null,
  setCasesListActiveSlug: (slug) => set({ casesListActiveSlug: slug }),
}));
