import { Navigate, Route, Routes } from "react-router-dom";
import {
  AboutUs,
  Contacts,
  DirectionDetail,
  GeneralDirection,
  Home,
  HomeWrapper,
} from "../../core";
import { ProjectsSegment } from "../../core/pages/ProjectsSegment/ProjectsSegment";
import {
  DEFAULT_PROJECT_CATEGORY,
  projectCategoryPath,
} from "../../core/data";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeWrapper />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="projects/:projectSlug" element={<ProjectsSegment />} />
        <Route
          path="projects"
          element={
            <Navigate
              to={projectCategoryPath(DEFAULT_PROJECT_CATEGORY)}
              replace
            />
          }
        />
        <Route path="directions/:directionSlug" element={<DirectionDetail />} />
        <Route path="directions" element={<GeneralDirection />} />
      </Route>
    </Routes>
  );
};
