import { useEffect, useMemo, useState } from "react";
import { Plyr } from "plyr-react";

import { ABOUT_HERO_HEADLINE, TEAM_MEMBERS } from "../../data";
import {
  AboutManifestoSection,
  Partners,
  ProjectSplitLayout,
  PromptInput,
  SiteFooter,
} from "../../components";
import "plyr-react/plyr.css";

import "./styles/about-us.scss";
import { GradientTitle, TextTag } from "../../uikit";

export const AboutUs = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeVideoLabel, setActiveVideoLabel] = useState<string>("");

  const playerSource = useMemo(
    () =>
      activeVideo
        ? {
            type: "video" as const,
            sources: [{ src: activeVideo, type: "video/mp4" }],
          }
        : null,
    [activeVideo]
  );

  useEffect(() => {
    if (!activeVideo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeVideo]);

  const openVideoPlayer = (videoSrc: string, label: string) => {
    setActiveVideo(videoSrc);
    setActiveVideoLabel(label);
  };

  return (
    <>
      <main
        className="about-us px-4 pt-[24px] pb-11 md:pb-16 relative"
        aria-labelledby="about-hero-heading"
      >
        <div className="about-us__headline mb-[20px] max-w-xs sm:max-w-400 md:max-w-xl lg:max-w-2xl xl:max-w-310">
          <GradientTitle
            value={ABOUT_HERO_HEADLINE}
            currentSize={36}
            mobileSize={30}
            tag={TextTag.H2}
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
              <GradientTitle
                value="О нас"
                currentSize={36}
                mobileSize={30}
                tag={TextTag.H2}
              />
              <PromptInput
                className="w-full absolute top-50 left-0"
                placeholder="Что вы хотите узнать?"
                aria-label="Что вы хотите узнать?"
              />
            </>
          )}
          mainClassName="flex min-w-0 flex-col gap-24 lg:gap-28"
        >
          <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.id}
                className="flex min-w-0 flex-col gap-4"
              >
                <button
                  type="button"
                  onClick={() => openVideoPlayer(member.videoSrc, member.imageAlt)}
                  className="about-us__card-image overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-[0_8px_32px_rgba(15,23,42,0.06)] cursor-pointer relative text-left group"
                  aria-label={`Открыть видео: ${member.imageAlt}`}
                >
                  <video
                    src={member.videoSrc}
                    aria-label={member.imageAlt}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-[#1a1a1acc] px-3 py-1 text-xs text-white">
                    Смотреть
                  </span>
                </button>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-xl md:text-2xl text-[#1a1a1a]">
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
      {playerSource ? (
        <div
          className="about-us__video-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 sm:px-5 sm:py-12"
          onClick={() => setActiveVideo(null)}
          role="presentation"
        >
          <div
            className="about-us__video-modal relative box-border w-full max-w-[min(92vw,640px)] rounded-2xl bg-black p-2 sm:p-3 md:p-4"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeVideoLabel || "Видео плеер"}
          >
            {/* Одна grid-ячейка = рамка видео; кнопка с padding внутри кадра, не у обводки модалки */}
            <div className="about-us__video-modal-stack grid w-full overflow-hidden rounded-xl bg-black [&>*]:col-start-1 [&>*]:row-start-1">
              <div className="about-us__video-player min-h-0 min-w-0 w-full">
                <Plyr
                  source={playerSource}
                  options={{
                    autoplay: true,
                    ratio: "1:1",
                    controls: [
                      "play-large",
                      "play",
                      "progress",
                      "current-time",
                      "mute",
                      "volume",
                      "fullscreen",
                    ],
                  }}
                />
              </div>
              <div className="pointer-events-none z-50 flex w-full justify-end self-start p-3 sm:p-4">
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="pointer-events-auto rounded-full bg-white/90 px-3 py-1.5 text-sm text-[#111111] shadow-sm hover:bg-white transition-colors"
                  aria-label="Закрыть плеер"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Partners />
      <SiteFooter />
    </>
  );
};
