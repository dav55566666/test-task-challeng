import { BASE_URL } from "@/app/core";
import { INft, INftResponse } from "./interfaces";
import { getNftImage, getNftPrice, getTimeoutDate } from "./fakers";

export async function fetchNfts(): Promise<INft[]> {
    const res = await fetch(`${BASE_URL}api/v3/nfts/list`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch NFTs');
    }

    const data = (await res.json()) as INftResponse[];

    return data.map(nft => ({
        id: nft.id,
        name: nft.name,
        timer: getTimeoutDate(),
        price: getNftPrice(),
        img: getNftImage()
    }));
}