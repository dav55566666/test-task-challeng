import { ETextSize, ETextWeight } from "@/app/core/common";
import { EHeadingType, ETitleColor } from "../enums";

export interface ITitleProps {
    headingType: EHeadingType;
    titleColor: ETitleColor;
    textSize: ETextSize;
    textWeight: ETextWeight;
    value: string;
}