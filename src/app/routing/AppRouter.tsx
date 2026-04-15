import { Route, Routes } from "react-router-dom";
import {
  AboutUs,
  Contacts,
  DirectionDetail,
  Home,
  HomeWrapper,
  OurProjects,
} from "../../core";
import { ProjectDetail } from "../../core/pages/ProjectDetail/ProjectDetail";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeWrapper />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="projects/:projectSlug" element={<ProjectDetail />} />
        <Route path="projects" element={<OurProjects />} />
        <Route path="directions/:directionSlug" element={<DirectionDetail />} />
      </Route>
    </Routes>
  );
};
