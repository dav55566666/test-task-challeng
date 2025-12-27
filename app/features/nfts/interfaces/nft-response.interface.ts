import { INftBase } from "./nfts-base.interface";

export interface INftResponse extends INftBase {
    contract_address: string;
    asset_platform_id: string;
    symbol: string;
}