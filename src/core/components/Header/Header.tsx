import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  getActiveProjectCategory,
  PROJECT_TABS,
  projectCategoryPath,
} from "../../data";
import { Icon, IconsName } from "../../design/Icon";
import { Tabs } from "../Tabs";

import "./styles/header.scss";

function isProjectsRoute(pathname: string): boolean {
  return pathname === "/projects" || pathname.startsWith("/projects/");
}

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeCategory = getActiveProjectCategory(location.pathname);
  const showProjectsTabs = isProjectsRoute(location.pathname);

  const handleProjectsTabChange = useCallback(
    (value: string) => {
      navigate(projectCategoryPath(value));
    },
    [navigate]
  );

  return (
    <header className="header">
      <div
        className={
          "header__inner w-full min-w-0 flex flex-row items-center " +
          "md:grid md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-center md:gap-6"
        }
      >
        <div className="shrink-0">
          <Link to="/">
            <Icon name={IconsName.LOGO_ICON} />
          </Link>
        </div>
        {showProjectsTabs ? (
          <div className="header__projects-tabs hidden min-w-0 md:flex md:items-center md:justify-start md:overflow-x-auto md:overscroll-x-contain">
            <Tabs
              items={PROJECT_TABS}
              activeValue={activeCategory}
              onChange={handleProjectsTabChange}
              aria-label="Категории проектов"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
};
