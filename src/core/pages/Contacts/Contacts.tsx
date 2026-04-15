import { CONTACT_ROWS } from "../../data";
import { ProjectSplitLayout } from "../../components";

const linkClass =
  "text-inherit underline-offset-4 transition-opacity hover:opacity-80 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b8cff]";

const enterRtl =
  "animate-in fade-in slide-in-from-right duration-600 ease-out fill-mode-backwards motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-x-0";

export const Contacts = () => {
  return (
    <main
      className="contacts w-full min-w-0 max-w-full overflow-x-clip px-5 pt-3 pb-10 md:pb-14"
      aria-labelledby="contacts-heading"
    >
      <ProjectSplitLayout
        as="section"
        aria-label="Контакты"
        className="gap-8! min-w-0! max-w-full! overflow-x-clip! p-0! pt-0!"
        mobileSticky={false}
        sidebarDesktopOnly={false}
        sidebar={() => (
          <h2
            id="contacts-heading"
            className="m-0 text-3xl font-normal sm:text-4xl"
          >
            Наши контакты
          </h2>
        )}
        mainClassName="min-w-0 max-w-full overflow-x-clip pt-1"
      >
        <dl className="m-0 flex min-w-0 max-w-full flex-col gap-8 overflow-x-clip md:gap-10 lg:gap-12">
          {CONTACT_ROWS.map((row, index) => (
            <div
              key={row.id}
              className={`grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:items-baseline sm:gap-x-10 md:gap-x-2 ${enterRtl}`}
              style={{
                animationDelay: `${80 + index * 90}ms`,
              }}
            >
              <dt className="font-light text-[#33333366] text-[15px] w-full text-start">
                {row.label}
              </dt>
              <dd className="m-0 text-2xl font-normal leading-snug text-[#1a1a1a] lg:text-2xl xl:text-4xl">
                {row.href ? (
                  <a
                    href={row.href}
                    className={linkClass}
                    {...(row.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </ProjectSplitLayout>
    </main>
  );
};
