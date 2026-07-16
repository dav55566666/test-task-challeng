import { BASE_MEDIA_URL } from "../../design";

/** Все PNG из `assets/partners/partner{N}.png` на S3, по возрастанию N. */
const PARTNER_LOGO_COUNT = 58;

export const PARTNER_LOGO_SRCS = Array.from(
  { length: PARTNER_LOGO_COUNT },
  (_, index) => `${BASE_MEDIA_URL}/partners/partner${index + 1}.png`,
);
