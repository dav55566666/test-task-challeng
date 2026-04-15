import { create } from "zustand";

/** Matches the first tab in `OurProjects` / `PROJECT_TABS`. */
const DEFAULT_CASES_TAB = "campaigns";

export type ProjectsUiState = {
  /** Active category tab on the full cases list (`/projects`). */
  casesActiveTab: string;
  setCasesActiveTab: (value: string) => void;
  /** Last opened project detail slug (e.g. analytics, “continue” UI). */
  lastViewedProjectSlug: string | null;
  setLastViewedProjectSlug: (slug: string | null) => void;
};

export const useProjectsUiStore = create<ProjectsUiState>((set) => ({
  casesActiveTab: DEFAULT_CASES_TAB,
  setCasesActiveTab: (value) => set({ casesActiveTab: value }),
  lastViewedProjectSlug: null,
  setLastViewedProjectSlug: (slug) => set({ lastViewedProjectSlug: slug }),
}));
