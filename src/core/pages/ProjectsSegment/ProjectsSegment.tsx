import { Navigate, useParams } from "react-router-dom";

import { OurProjects } from "../../components";
import {
  DEFAULT_PROJECT_CATEGORY,
  isProjectCategory,
  OUR_PROJECTS,
  projectCategoryPath,
} from "../../data";
import { ProjectDetail } from "../ProjectDetail/ProjectDetail";

export const ProjectsSegment = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  if (!projectSlug) {
    return (
      <Navigate to={projectCategoryPath(DEFAULT_PROJECT_CATEGORY)} replace />
    );
  }

  if (isProjectCategory(projectSlug)) {
    return (
      <>
        <OurProjects category={projectSlug} />
      </>
    );
  }

  const project = OUR_PROJECTS.find((item) => item.slug === projectSlug);
  if (project) {
    return <ProjectDetail />;
  }

  return (
    <Navigate to={projectCategoryPath(DEFAULT_PROJECT_CATEGORY)} replace />
  );
};
