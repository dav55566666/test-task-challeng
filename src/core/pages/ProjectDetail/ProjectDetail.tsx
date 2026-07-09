import { useCallback, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  ProjectSplitLayout,
  ProjectSplitPrompt,
  caseStudyBodyCopyClass,
} from "../../components";
import { Tabs } from "../../components/Tabs";
import { OUR_PROJECTS, PROJECT_TABS, projectCategoryPath } from "../../data";
import { ProjectGallery } from "./ProjectGallery";
import { GradientTitle, TextTag } from "../../uikit";

const MOBILE_TABS_STICKY_CLASS =
  "sticky top-[var(--site-header-sticky-height)] z-20 -mx-5 bg-white px-5 pt-2 pb-2 md:mx-0 md:px-0 md:py-2 md:pb-3 md:hidden";

export const ProjectDetail = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const navigate = useNavigate();
  const project = useMemo(
    () => OUR_PROJECTS.find((p) => p.slug === projectSlug),
    [projectSlug]
  );

  const handleTabChange = useCallback(
    (value: string) => {
      navigate(projectCategoryPath(value));
    },
    [navigate]
  );

  if (!projectSlug || !project) {
    return <Navigate to="/products" replace />;
  }

  return (
    <>
      <ProjectSplitLayout
        as="main"
        aria-label={project.title}
        className="pb-10"
        mobileSticky={() => (
          <>
            <GradientTitle
              value={project.title}
              currentSize={36}
              mobileSize={24}
              tag={TextTag.H1}
            />
            <p className={caseStudyBodyCopyClass}>{project.description}</p>
            <Tabs
              items={PROJECT_TABS}
              activeValue={project.tabValue}
              onChange={handleTabChange}
              aria-label="Категории проектов"
            />
          </>
        )}
        mobileStickyClassName={MOBILE_TABS_STICKY_CLASS}
        sidebar={() => (
          <>
            <div className="flex flex-col">
              <GradientTitle value={project.title} currentSize={36} mobileSize={24} tag={TextTag.H1} />
              <p className={caseStudyBodyCopyClass}>{project.description}</p>
            </div>

            <ProjectSplitPrompt className="mt-6 md:mt-0" />
          </>
        )}
      >
        <ProjectGallery
          images={project.galleryImages}
          layout={project.galleryLayout}
          primaryAlt={project.imageAlt}
          title={project.title}
        />
      </ProjectSplitLayout>
    </>
  );
};
