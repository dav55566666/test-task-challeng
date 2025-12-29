import gsap from "gsap/all";
import { IImagesAnimation } from "../interfaces";
import { EWindowSize } from "../enums";
import { getWindowSize } from "./get-window-size.helper";

export const imagesAnimation = ({
    leftImgRef,
    rightImgRef,
    arrowImgRef
}: IImagesAnimation) => {
    const windowSize: EWindowSize = getWindowSize();
    const left: number = windowSize === EWindowSize.DECSTOP ? -80 : EWindowSize.TABLET ? -20 : EWindowSize.MOBILE && 20;

    const tl = gsap.timeline({
        defaults: {
            ease: 'power3.out',
            duration: 2,
        },
    });

    tl.to(leftImgRef.current, {
        left
    });

    tl.to(
        rightImgRef.current,
        {
            right: 0
        },
        '-=0.6'
    );

    tl.to(
        arrowImgRef.current,
        {
            opacity: 1,
        },
        '-=0.4'
    );
}