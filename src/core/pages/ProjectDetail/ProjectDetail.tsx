import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import {
  ProjectSplitLayout,
  ProjectSplitPrompt,
  SiteFooter,
  caseStudyBodyCopyClass,
} from "../../components";
import { OUR_PROJECTS } from "../../data";
import { PRODUCT_CASE_GALLERY } from "../../design";
import { ProjectGallery } from "./ProjectGallery";
import { GradientTitle, TextTag } from "../../uikit";

export const ProjectDetail = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const project = useMemo(
    () => OUR_PROJECTS.find((p) => p.slug === projectSlug),
    [projectSlug]
  );

  if (!projectSlug || !project) {
    return <Navigate to="/products" replace />;
  }

  const galleryImages = [project.image, ...PRODUCT_CASE_GALLERY];

  return (
    <>
      <ProjectSplitLayout
        as="main"
        aria-label={project.title}
        className="pb-10"
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
          images={galleryImages}
          primaryAlt={project.imageAlt}
          title={project.title}
        />
      </ProjectSplitLayout>
      <SiteFooter />
    </>
  );
};
