export type TabItem = {
  label: string;
  value: string;
};

export type TabsProps = {
  items: TabItem[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
  "aria-label"?: string;
};

export function Tabs({
  items,
  activeValue,
  onChange,
  className,
  "aria-label": ariaLabel,
}: TabsProps) {
  return (
    <div
      className={
        "tabs flex flex-wrap items-end gap-x-5 gap-y-3 bg-white md:gap-x-8 md:gap-y-2.5 mt-4 md:mt-0" +
        (className ?? "")
      }
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isActive = item.value === activeValue;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            id={`tab-${item.value}`}
            className={
              "tabs__tab relative shrink-0 cursor-pointer border-0 bg-transparent px-1 pb-0.5 pt-1 " +
              "text-base font-normal transition-colors " +
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 " +
              "focus-visible:ring-offset-2"
            }
            onClick={() => onChange(item.value)}
          >
            <span
              className='text-sm text-[#a0a0a0]'
            >
              {item.label}
            </span>
            {isActive ? (
              <span
                className={
                  "pointer-events-none absolute right-0 bottom-0 left-0 h-0.5 rounded-full " +
                  "bg-[linear-gradient(90deg,#C5B4E3_0%,#82C9E7_100%)]"
                }
                aria-hidden
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
