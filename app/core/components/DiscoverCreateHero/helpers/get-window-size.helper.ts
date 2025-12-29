import { TNullable } from "@/app/core/common";
import { EWindowSize } from "../enums";

export const getWindowSize = (): EWindowSize  => {
    const {outerWidth} = window;
    return outerWidth < 1300 ? EWindowSize.TABLET : outerWidth < 1024 ? EWindowSize.MOBILE : EWindowSize.DECSTOP
}