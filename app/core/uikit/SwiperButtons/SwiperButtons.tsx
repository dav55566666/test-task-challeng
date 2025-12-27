import { ETheme } from '../../common';
import { ArrowLeftIcon, ArrowRightIcon } from '../../svgs';
import { Button, EBgType } from '../Button';
import { ISwiperButtonsProps } from './interfaces';

const SwiperButtons = ({
    next,
    prev
}: ISwiperButtonsProps) => {
  return (
    <div className='swiper-buttons'>
        <Button 
            bgType={EBgType.FILL}
            theme={ETheme.LIGHT}
            Icon={<ArrowLeftIcon />}
            click={prev}
        />
        <Button 
            bgType={EBgType.FILL}
            theme={ETheme.LIGHT}
            Icon={<ArrowRightIcon />}
            click={next}
        />
    </div>
  )
};

export default SwiperButtons;