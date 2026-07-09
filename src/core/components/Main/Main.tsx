import { useState, useLayoutEffect } from "react";
import { GradientTitle, TextTag } from "../../uikit";
import { Logo } from "../Logo";
import './styles/main.scss';

export const Main = () => {
    const [minHeight, setMinHeight] = useState<string | number>("auto");

    useLayoutEffect(() => {
        const handleResize = () => {
            // Проверяем ширину экрана (меньше 768px)
            if (window.innerWidth < 768) {
                // Берем истинную высоту окна и бахаем + 120px сверху
                const calculatedHeight = window.innerHeight + 120;
                setMinHeight(`${calculatedHeight}px`);
            } else {
                // На десктопах сбрасываем, пускай CSS рулит (или ставим 100% / auto)
                setMinHeight("auto");
            }
        };

        // Запускаем сразу при монтировании
        handleResize();

        // Вешаем слушатель, если вдруг он перевернет айфон в горизонтальный режим
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if(window.innerWidth < 767) {
        return (
            <section className="main" style={{ minHeight }}>
                <div className="main__text">
                    <GradientTitle 
                        value="Решаем задачи бизнеса с помощью творческой силы увлеченных профессионалов" 
                        currentSize={32} 
                        mobileSize={28} 
                        tag={TextTag.H1} 
                    />
                    <p>поддерживаемых ИИ-системой операционных процессов</p>
                </div>
                <div className="main__logo">
                    <Logo />
                </div>
            </section>
        );
    }else {
        return (
            <section className="main">
                <div className="main__text">
                    <GradientTitle 
                        value="Решаем задачи бизнеса с помощью творческой силы увлеченных профессионалов" 
                        currentSize={32} 
                        mobileSize={28} 
                        tag={TextTag.H1} 
                    />
                    <p>поддерживаемых ИИ-системой операционных процессов</p>
                </div>
                <div className="main__logo">
                    <Logo />
                </div>
            </section>
        );
    }
};