import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { GradientTitle, TextTag } from "../../uikit";
import { Logo } from "../Logo";
import './styles/main.scss';

/** Минимальный зазор между низом текстового блока и «верхом» зоны логотипа при укороченном экране. */
const MAIN_LOGO_TEXT_GAP_PX = 16;

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

        const update = () => {
            const mainRect = root.getBoundingClientRect();
            const textRect = text.getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();

            if (mainRect.height < 1 || logoRect.height < 1) return;

            const textBottomInMain = textRect.bottom - mainRect.top;
            const idealLogoTop = mainRect.height / 2 - logoRect.height / 2;
            const clearanceLogoTop = textBottomInMain + MAIN_LOGO_TEXT_GAP_PX;

            /** Позиция логотипа при «идеальном» вертикальном центре внутри .main (в координатах вьюпорта). */
            const centeredLogoTop = mainRect.top + idealLogoTop;
            const centeredLogoBottom = centeredLogoTop + logoRect.height;
            const logoLeft = logoRect.left;
            const logoRight = logoRect.right;

            const overlapsHorizontally =
                textRect.right > logoLeft && textRect.left < logoRight;
            const overlapsVerticallyWhenCentered =
                textRect.bottom > centeredLogoTop && textRect.top < centeredLogoBottom;
            const wouldOverlapIfCentered = overlapsHorizontally && overlapsVerticallyWhenCentered;

            const nextTop: number | null = wouldOverlapIfCentered
                ? Math.max(idealLogoTop, clearanceLogoTop)
                : null;

            setLogoTopPx(nextTop);
        };

        update();

        const ro = new ResizeObserver(update);
        ro.observe(root);
        ro.observe(text);
        ro.observe(logo);
        window.addEventListener("resize", update);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
        };
    }, []);

    const logoModifier = logoTopPx != null ? " main__logo--layout-clearance" : "";
    const logoStyle: CSSProperties | undefined =
        logoTopPx != null ? { marginTop: logoTopPx } : undefined;

    return (
        <section className="main" ref={rootRef}>
            <div className="main__text" ref={textRef}>
                <GradientTitle value="Решаем задачи бизнеса с помощью творческой силы увлеченных профессионалов" currentSize={32} mobileSize={24} tag={TextTag.H1} />
                <p>поддерживаемых ИИ-системой операционных процессов</p>
            </div>
            <div
                className={"main__logo" + logoModifier}
                ref={logoRef}
                style={logoStyle}
            >
                <Logo />
            </div>
        </section>
    );
};
