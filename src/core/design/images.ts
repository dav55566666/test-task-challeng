import arrow from '../../assets/arrow.svg';
import arrowRightTop from '../../assets/arrow-right-top.svg';
import arrowRight from '../../assets/arrow-right.svg';
import arrowUp from '../../assets/arrow-up.svg';
import logoMask from '../../assets/logo-mask.png';
import logoMaskGradient from '../../assets/logo-mask-gradient.png';
/** WebP: `npm run assets:webp` (max 1680px). */
import project1 from '../../assets/project1.webp';
import project2 from '../../assets/project2.webp';
import project3 from '../../assets/project3.webp';
import project1_1 from '../../assets/project1_1.webp';
import project1_2 from '../../assets/project1_2.webp';
import project1_3 from '../../assets/project1_3.webp';
import project1_4 from '../../assets/project1_4.webp';
import project1_5 from '../../assets/project1_5.webp';
import logoAnimation from '../../assets/logo-animation.mp4';
import logoBgVideo from '../../assets/logo-bg-video.mp4';
export const IMAGES = {
  logoAnimation,
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
} as const;

export const PRODUCT_CASE_GALLERY = [
  IMAGES.project1_1,
  IMAGES.project1_2,
  IMAGES.project1_3,
  IMAGES.project1_4,
  IMAGES.project1_5,
] as const;
