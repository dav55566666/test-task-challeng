import { useLayoutEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import type { IAppProvidersProps } from "./interfaces";
import { ScrollProvider } from "./ScrollProvider";

const RouteScrollTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <BrowserRouter>
      <ScrollProvider>{children}</ScrollProvider>
      <RouteScrollTop />
    </BrowserRouter>
  );
};
