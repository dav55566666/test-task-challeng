'use client';
import { Button, Description, EBgType, EDescriptionColors, EHeadingType, ETitleColor, Title } from '../../uikit'
import { ETextFont, ETextSize, ETextWeight, ETheme, TNullable } from '../../common'
import { useEffect, useRef } from 'react';
import gsap from 'gsap/all';
import { imagesAnimation } from './helpers';

const DiscoverCreateHero = () => {
  const leftImgRef = useRef<TNullable<HTMLImageElement>>(null);
  const rightImgRef = useRef<TNullable<HTMLImageElement>>(null);
  const arrowImgRef = useRef<TNullable<HTMLImageElement>>(null);

  useEffect(() => {
    if (!leftImgRef.current || !rightImgRef.current || !arrowImgRef.current) return;
    imagesAnimation({
      leftImgRef: leftImgRef,
      rightImgRef: rightImgRef,
      arrowImgRef: arrowImgRef
    })
  }, []);
  return (
    <section className="discover-create-hero">
      <div className="discover-create-hero__container container">
        <div className="discover-create-hero__content">
          <Title
            headingType={EHeadingType.H1}
            titleColor={ETitleColor.DARK_GRAY}
            textSize={ETextSize.LARGE}
            textWeight={ETextWeight.SEMI_BOLD}
            value='Discover And Create NFTs'
          />
          <Description
            value='Discover, Create and Sell NFTs On Our NFT Marketplace With Over Thousands Of NFTs And Get a <strong class="color-dark-gray">$20 bonus.</strong>'
            textSize={ETextSize.MEDIUM}
            textWeight={ETextWeight.REGULAR}
            textFont={ETextFont.INTER}
            color={EDescriptionColors.DARK_GRAY}
            isParser
          />
          <div className="discover-create-hero__buttons">
            <Button
              bgType={EBgType.FILL}
              theme={ETheme.DARK}
              value='Explore More'
              maxWidth='180px'
            />
            <Button
              bgType={EBgType.EMPTY}
              theme={ETheme.DARK}
              value='create NFT'
              maxWidth='140px'
            />
          </div>
          <div className="discover-create-hero__advantages">
            <div className="discover-create-hero__advantages-item">
              <p>430K+</p>
              <span>Art Works</span>
            </div>
            <div className="discover-create-hero__advantages-item">
              <p>159K+</p>
              <span>Creators</span>
            </div>
            <div className="discover-create-hero__advantages-item">
              <p>87K+</p>
              <span>Collections</span>
            </div>
          </div>
        </div>
        <div className="discover-create-hero__images">
          <img src="/img/dots.png" className='dot-img' />
          <img ref={arrowImgRef} src="/img/arrow-img.png" className="arrow-img" />
          <img ref={leftImgRef} src="/img/nft.png" alt="" className="nft-left-img" />
          <img ref={rightImgRef} src="/img/nft-5.png" alt="" className="nft-right-img" />
        </div>
      </div>
    </section>
  )
}

export default DiscoverCreateHero