import { createContext } from "react";

export type GradientShineRegister = (
  element: HTMLElement,
  onVisibilityChange: (inView: boolean) => void,
) => () => void;

export type GradientShineContextValue = {
  register: GradientShineRegister;
};

export const GradientShineContext = createContext<GradientShineContextValue | null>(
  null,
);
