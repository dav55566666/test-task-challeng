import { ETextFont, ETextSize, ETextWeight } from "@/app/core/common";
import { EDescriptionColors } from "../enums";

export interface IDescriptionProps {
    textSize: ETextSize;
    textWeight: ETextWeight;
    textFont: ETextFont;
    color: EDescriptionColors;
    value: string;
    isParser: boolean;
}