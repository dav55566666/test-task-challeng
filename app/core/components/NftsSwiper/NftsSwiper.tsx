'use client';
import { Swiper, type SwiperRef, SwiperSlide } from "swiper/react"
import { useRef } from "react"
import { TNullable } from "../../common"
import { INftsSwiperProps } from "./interfaces"
import { NftItem, SwiperButtons } from "../../uikit"
import 'swiper/css'

const NftsSwiper = ({ nftsData }: INftsSwiperProps) => {
    const nftsSwiperRef = useRef<TNullable<SwiperRef>>(null)
    return (
        <div className="nfts-swiper">
            <Swiper ref={nftsSwiperRef} slidesPerView={'auto'}>
                {
                    nftsData.map(nft => (
                        <SwiperSlide key={nft.id}>
                            <NftItem item={nft} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <SwiperButtons next={() => nftsSwiperRef.current?.swiper.slideNext()} prev={() => nftsSwiperRef.current?.swiper.slidePrev()} />
        </div>
    )
}

export default NftsSwiper