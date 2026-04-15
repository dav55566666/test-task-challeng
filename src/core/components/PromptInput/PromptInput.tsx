import type { InputHTMLAttributes } from "react";

import { IMAGES } from "../../design";

import "./styles/prompt-input.scss";

export function PromptInput({
  className,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className ? `prompt-input ${className}` : "prompt-input"}>
      <input type={type} className="prompt-input__field" {...props} />
      <span className="prompt-input__icon" aria-hidden>
        <img
          src={IMAGES.arrowUp}
          alt=""
          width={16}
          height={16}
        />
      </span>
    </div>
  );
}
