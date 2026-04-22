import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import { useProjectsUiStore } from "../../../store";
import { PROJECT_TABS } from "../../data";
import { Icon, IconsName } from "../../design/Icon";
import { Tabs } from "../Tabs";

import "./styles/header.scss";

export const Header = () => {
  const location = useLocation();
  const casesActiveTab = useProjectsUiStore((s) => s.casesActiveTab);
  const setCasesActiveTab = useProjectsUiStore((s) => s.setCasesActiveTab);
  const scrollToCaseByTab = useProjectsUiStore((s) => s.scrollToCaseByTab);

  const showProjectsTabs = location.pathname === "/projects";

  const handleProjectsTabChange = useCallback(
    (value: string) => {
      setCasesActiveTab(value);
      scrollToCaseByTab(value);
    },
    [scrollToCaseByTab, setCasesActiveTab]
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
              activeValue={casesActiveTab}
              onChange={handleProjectsTabChange}
              aria-label="Категории проектов"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
};
