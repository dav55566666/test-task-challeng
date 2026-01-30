import type { FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum } from "../enums";

export interface ITextStyles {
    fontStyle: FontStyleEnum;
    fontWeight: FontWeightEnum;
    fontFamily: FontFamilyEnum;
    fontSize: FontSizesEnum;
    color: string;
}