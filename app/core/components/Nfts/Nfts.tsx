import { fetchNfts, INft } from "@/app/features"
import { EHeadingType, ETitleColor, Title } from "../../uikit"
import { ETextSize, ETextWeight } from "../../common"
import { NftsSwiper } from "../NftsSwiper"

const Nfts = async () => {
  const nftsData: INft[] = await fetchNfts()
  console.log(nftsData, 'asd')
  return (
    <section className="nfts">
      <div className="nfts__container container">
        <Title value="Weekly - Top NFT" headingType={EHeadingType.H2} titleColor={ETitleColor.LIGHT_GRAY} textSize={ETextSize.MEDIUM} textWeight={ETextWeight.SEMI_BOLD} />
        <NftsSwiper nftsData={nftsData} />
      </div>
    </section>
  )
}

export default Nfts