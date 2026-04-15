// import logoBgVideo from '../../assets/logo-bg-video.mp4';
import arrow from '../../assets/arrow.svg';
import arrowRightTop from '../../assets/arrow-right-top.svg';
import arrowRight from '../../assets/arrow-right.svg';
import arrowUp from '../../assets/arrow-up.svg';
import logoMask from '../../assets/logo-mask.png';
/** Маска анимации лого: даунсэмпл из `big-logo.png` (напр. `sips -Z 2560 big-logo.png -o logo-mask-gradient.png`). */
import logoMaskGradient from '../../assets/logo-mask-gradient.png';
import person1 from '../../assets/person1.png';
import person2 from '../../assets/person2.png';
import person3 from '../../assets/person3.png';
import project1 from '../../assets/project1.png';
import project2 from '../../assets/project2.png';
import project3 from '../../assets/project3.png';
import project1_1 from '../../assets/project1_1.png';
import project1_2 from '../../assets/project1_2.png';
import project1_3 from '../../assets/project1_3.png';
import project1_4 from '../../assets/project1_4.png';
import project1_5 from '../../assets/project1_5.png';
import logoBgVideo from '../../assets/logo-bg-video.mp4';

export const IMAGES = {
  logoVideo: logoBgVideo,
  logoMask,
  logoMaskGradient,
  arrow,
  arrowRightTop,
  arrowRight,
  arrowUp,
  project1,
  project2,
  project3,
  project1_1,
  project1_2,
  project1_3,
  project1_4,
  project1_5,
  person1,
  person2,
  person3,
} as const;

export const PRODUCT_CASE_GALLERY = [
  IMAGES.project1_1,
  IMAGES.project1_2,
  IMAGES.project1_3,
  IMAGES.project1_4,
  IMAGES.project1_5,
] as const;
