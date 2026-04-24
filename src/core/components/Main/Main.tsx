import { GradientTitle, TextTag } from "../../uikit";
import { Logo } from "../Logo";
import './styles/main.scss';

export const Main = () => {
    return (
        <section className="main">
            <div className="main__text">
                <GradientTitle value="Решаем задачи бизнеса с помощью творческой силы увлеченных профессионалов" currentSize={32} mobileSize={22} tag={TextTag.H1} />
                <p>поддерживаемых ИИ-системой операционных процессов</p>
            </div>
            <div className="main__logo">
                <Logo />
            </div>
        </section>
    )
}
