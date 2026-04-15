import { BrowserRouter } from "react-router-dom";

import type { IAppProvidersProps } from "./interfaces";
import { ScrollProvider } from "./ScrollProvider";

export const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <BrowserRouter>
      <ScrollProvider>{children}</ScrollProvider>
    </BrowserRouter>
  );
};
