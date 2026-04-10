import * as React from "react";

import "./blob.css";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={
          "relative inline-flex items-center gap-2 overflow-visible rounded-full border-0 bg-transparent px-6 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
          className
        }
        {...props}
      >
        <span className="glow-btn-halo z-0" aria-hidden>
          <span className="blob-glow blob-glow-1"/>
          <span className="blob-glow blob-glow-2" />
          <span className="blob-glow blob-glow-3"/>
        </span>
        <span
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-full border border-white/45 bg-[linear-gradient(90deg,rgba(224,195,252,0.38)_0%,rgba(186,230,253,0.48)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
          aria-hidden
        />
        <span className="relative z-20 contents">{children}</span>
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton };
