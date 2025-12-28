import { Button, Description, EBgType, EDescriptionColors, EHeadingType, ETitleColor, Title } from '../../uikit';
import { ETextFont, ETextSize, ETextWeight, ETheme } from '../../common';
import Image from 'next/image';

const CreateAndSell = () => {
  return (
    <section className="create-and-sell">
      <div className="create-and-sell__container container">
        <div className="create-and-sell__content">
          <Title
            headingType={EHeadingType.H2}
            titleColor={ETitleColor.WHITE}
            textSize={ETextSize.MEDIUM}
            textWeight={ETextWeight.SEMI_BOLD}
            value='Create and Sell NFTs'
          />
          <Description
            value='World’s Largest NFT Place'
            textSize={ETextSize.MEDIUM}
            textWeight={ETextWeight.REGULAR}
            textFont={ETextFont.INTER}
            color={EDescriptionColors.MEDIUM_GRAY}
            isParser={false}
          />
          <div className="discover-create-hero__buttons">
            <Button 
              bgType={EBgType.FILL}
              theme={ETheme.LIGHT}
              value='Explore More'
              maxWidth='180px'
            />
            <Button 
              bgType={EBgType.EMPTY}
              theme={ETheme.LIGHT}
              value='Sell Artwork'
              maxWidth='180px'
            />
          </div>
        </div>
        <div className="create-and-sell__img">
          <Image src={'/img/nft.png'} width={370} height={250} alt='nft' />
        </div>
      </div>
    </section>
  )
};

export default CreateAndSell;