'use client'
import Image from 'next/image'
import { INftItemProps } from './interfaces'
import { formatTimeoutDate } from './helpers'
import { EHeadingType, ETitleColor, Title } from '../Title'
import { ETextFont, ETextSize, ETextWeight, ETheme, TNullable } from '../../common'
import { Description, EDescriptionColors } from '../Description'
import { Button, EBgType } from '../Button'
import { useEffect, useState } from 'react'
import { EtherIcon } from '../../svgs'

const NftItem = ({ item }: INftItemProps) => {
    const [timer, setTimer] = useState<TNullable<string>>(null)
    useEffect(() => {
        setTimer(formatTimeoutDate(item.timer))   
    })
    return (
        <div className='nft-item'>
            <div className='nft-item__img'>
                <Image src={item.img} width={253} height={253} alt={item.name} />
                <span className='timer'>{timer}</span>
            </div>
            <div className='nft-item__content'>
                <Title value={item.name} headingType={EHeadingType.H3} titleColor={ETitleColor.DARK_GRAY} textSize={ETextSize.SMALL} textWeight={ETextWeight.SEMI_BOLD} />
                <div className="nft-item__bottom">
                    <div className="nft-item__price">
                        <Description value='Current bid' isParser={false} color={EDescriptionColors.MEDIUM_GRAY} textSize={ETextSize.SMALL} textWeight={ETextWeight.REGULAR} textFont={ETextFont.POPPINS} />
                        <span className='price'><EtherIcon />{item.price}</span>
                    </div>
                    <Button bgType={EBgType.FILL} theme={ETheme.DARK} value='PLACE BID' maxWidth='120px' />
                </div>
            </div>
        </div>
    )
}

export default NftItem