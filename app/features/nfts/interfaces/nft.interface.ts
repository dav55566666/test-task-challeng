import { INftBase } from "./nfts-base.interface";

export interface INft extends INftBase {
    timer: Date;
    price: number;
    img: string;
}