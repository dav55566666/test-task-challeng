import { ABOUT_HERO_HEADLINE, TEAM_MEMBERS } from "../../data";
import {
  AboutManifestoSection,
  Partners,
  ProjectSplitLayout,
  PromptInput,
  SiteFooter,
} from "../../components";

import "./styles/about-us.scss";
import { GradientTitle, TextTag } from "../../uikit";

export const AboutUs = () => {
  return (
    <>
      <main
        className="about-us px-5 pt-3 pb-10 md:pb-14 relative"
        aria-labelledby="about-hero-heading"
      >
        <div className="mb-16 md:mb-36 max-w-xs sm:max-w-400 md:max-w-xl lg:max-w-2xl xl:max-w-7xl">
          <GradientTitle
            value={ABOUT_HERO_HEADLINE}
            currentSize={60}
            mobileSize={40}
            tag={TextTag.H1}
          />
        </div>
        <ProjectSplitLayout
          as="section"
          aria-label="О нас"
          className="gap-6! p-0! pt-0!"
          mobileSticky={false}
          sidebarDesktopOnly={false}
          sidebar={() => (
            <>
              <h2 className="m-0 text-3xl sm:text-4xl text-[#333333]">О нас</h2>
              <PromptInput
                className="w-full absolute top-50 left-0"
                placeholder="Что вы хотите узнать?"
                aria-label="Что вы хотите узнать?"
              />
            </>
          )}
          mainClassName="flex min-w-0 flex-col gap-12 md:gap-16 lg:gap-20"
        >
          <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.id}
                className="flex min-w-0 flex-col gap-4"
              >
                <div className="about-us__card-image overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
                  <video
                    src={member.videoSrc}
                    aria-label={member.imageAlt}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-xl sm:text-2xl text-[#1a1a1a]">
                    {member.name}
                  </span>
                  <span className="text-sm font-light text-[#33333366]">
                    {member.role}
                  </span>
                </div>
                <p className="text-lg font-light text-[#333333A3]">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>

          <AboutManifestoSection />
        </ProjectSplitLayout>
      </main>
      <Partners />
      <SiteFooter />
    </>
  );
};
