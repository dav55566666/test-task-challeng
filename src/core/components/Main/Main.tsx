import { useLayoutEffect, useRef, useState } from "react";
import { GradientTitle, TextTag } from "../../uikit";
import { Logo } from "../Logo";
import './styles/main.scss';

/** Поднимаем F выше геометрического центра hero. */
const MAIN_LOGO_NUDGE_DOWN_PX = -38;
/** При пересечении по X верх F выравниваем с нижней границей текста. */
const MAIN_LOGO_TEXT_GAP_PX = 0;
/** Совпадает с mobile-колонкой в `main.scss`. */
const MOBILE_HERO_LAYOUT_MAX_WIDTH_PX = 480;

export const Main = () => {
    const rootRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const [logoTopPx, setLogoTopPx] = useState<number | null>(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        const text = textRef.current;
        const logo = logoRef.current;
        if (!root || !text || !logo) return;
        let rafId: number | null = null;
        let timeoutId: number | null = null;

        const update = () => {
            if (window.innerWidth <= MOBILE_HERO_LAYOUT_MAX_WIDTH_PX) {
                setLogoTopPx(null);
                return;
            }

            const mainRect = root.getBoundingClientRect();
            const textRect = text.getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();

            if (mainRect.height < 1 || logoRect.height < 1) return;

            const textBottomInMain = textRect.bottom - mainRect.top;
            const textLeftInMain = textRect.left - mainRect.left;
            const textRightInMain = textRect.right - mainRect.left;
            const centeredLogoTopInMain = mainRect.height / 2 - logoRect.height / 2;
            const nudgedLogoTopInMain = centeredLogoTopInMain + MAIN_LOGO_NUDGE_DOWN_PX;
            const clearanceLogoTopInMain = textBottomInMain + MAIN_LOGO_TEXT_GAP_PX;

            const logoWidth = logoRect.width;
            const logoLeftWhenCentered = (mainRect.width - logoWidth) / 2;
            const logoRightWhenCentered = logoLeftWhenCentered + logoWidth;
            const overlapsHorizontally =
                textRightInMain > logoLeftWhenCentered &&
                textLeftInMain < logoRightWhenCentered;

            const nextTop = overlapsHorizontally
                ? clearanceLogoTopInMain + MAIN_LOGO_NUDGE_DOWN_PX
                : nudgedLogoTopInMain;

            setLogoTopPx(nextTop);
        };

        update();
        rafId = window.requestAnimationFrame(update);
        timeoutId = window.setTimeout(update, 0);

        const ro = new ResizeObserver(update);
        ro.observe(root);
        ro.observe(text);
        ro.observe(logo);
        window.addEventListener("resize", update);
        window.addEventListener("load", update);

        return () => {
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
            ro.disconnect();
            window.removeEventListener("resize", update);
            window.removeEventListener("load", update);
        };
    }, []);

    return (
        <section className="main" ref={rootRef}>
            <div className="main__text" ref={textRef}>
                <GradientTitle value="Решаем задачи бизнеса с помощью творческой силы увлеченных профессионалов" currentSize={32} mobileSize={28} tag={TextTag.H1} />
                <p>поддерживаемых ИИ-системой операционных процессов</p>
            </div>
            <div
                className="main__logo main__logo--positioned"
                ref={logoRef}
                style={logoTopPx !== null ? { top: logoTopPx, transform: "none" } : undefined}
            >
                <Logo />
            </div>
        </section>
    );
};
