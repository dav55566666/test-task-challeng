import type { InputHTMLAttributes } from "react";

import { PromptInput } from "../PromptInput";

const BASE =
  "w-full md:absolute md:-bottom-101.5 md:left-0 md:block";

export type ProjectSplitPromptProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "placeholder" | "aria-label"
> & {
  className?: string;
};

export function ProjectSplitPrompt({
  className,
  placeholder = "Что вы хотите узнать?",
  "aria-label": ariaLabel = "Что вы хотите узнать?",
  ...rest
}: ProjectSplitPromptProps) {
  return (
    <PromptInput
      className={className ? `${BASE} ${className}` : BASE}
      placeholder={placeholder}
      aria-label={ariaLabel}
      {...rest}
    />
  );
}
