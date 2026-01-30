import type { GapType } from "../../../../common";
import type { ITextStyles } from "../../Text";
import type { ButtonBgs, ButtonTypesEnum } from "../enums";

export interface IButtonProps {
    value?: string;
    label?: string;
    click: () => void;
    type: ButtonTypesEnum;
    Icon?: React.ReactNode;
    gap?: GapType;
    bg?: ButtonBgs;
    textStyles?: ITextStyles;
}