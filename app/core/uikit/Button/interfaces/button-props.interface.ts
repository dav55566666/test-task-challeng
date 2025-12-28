import { ETheme } from "@/app/core/common";
import { EBgType } from "../enums";
import React from "react";

export interface IButtonProps {
    bgType: EBgType;
    theme: ETheme;
    value?: string;
    click?: () => void;
    Icon?: React.ReactNode;
    maxWidth?: string;
}