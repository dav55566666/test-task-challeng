import { createContext } from "react";

import type { IScrollContextValue } from "./interfaces";

export const ScrollContext = createContext<IScrollContextValue | null>(null);
