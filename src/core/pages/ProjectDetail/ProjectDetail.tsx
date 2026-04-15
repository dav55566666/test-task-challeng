import { useLayoutEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import {
  ProjectSplitLayout,
  ProjectSplitPrompt,
  caseStudyBodyCopyClass,
} from "../../components";
import { OUR_PROJECTS } from "../../data";
import { PRODUCT_CASE_GALLERY } from "../../design";
import { useProjectsUiStore } from "../../../store";
import { ProjectGallery } from "./ProjectGallery";
import { GradientTitle, TextTag } from "../../uikit";

export const ProjectDetail = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const project = useMemo(
    () => OUR_PROJECTS.find((p) => p.slug === projectSlug),
    [projectSlug]
  );
  const setLastViewedProjectSlug = useProjectsUiStore(
    (s) => s.setLastViewedProjectSlug
  );

  useLayoutEffect(() => {
    if (!project?.slug) return;
    setLastViewedProjectSlug(project.slug);
  }, [project?.slug, setLastViewedProjectSlug]);

  if (!projectSlug || !project) {
    return <Navigate to="/products" replace />;
  }

  const galleryImages = [project.image, ...PRODUCT_CASE_GALLERY];

  return (
    <ProjectSplitLayout
      as="main"
      aria-label={project.title}
      className="pb-10"
      sidebar={() => (
        <>
          <Link
            to="/projects"
            className="product-detail__back mb-5 inline-flex items-center gap-2 text-[15px] font-medium text-[#333333] no-underline md:mb-6"
          >
            Назад
          </Link>

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
  );
};
