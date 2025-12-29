import { TNullable } from "@/app/core/common";
import { RefObject } from "react";

export interface IImagesAnimation {
    leftImgRef: RefObject<TNullable<HTMLImageElement>>;
    rightImgRef: RefObject<TNullable<HTMLImageElement>>;
    arrowImgRef: RefObject<TNullable<HTMLImageElement>>;
}