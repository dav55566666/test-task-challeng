const nftImagesData: string[] = [
  '/img/nft.png',
  '/img/nft-2.png',
  '/img/nft-3.png',
  '/img/nft-4.png',
];

export const getNftImage = (): string => {
  const randomIndex = Math.floor(Math.random() * nftImagesData.length);
  return nftImagesData[randomIndex];
};