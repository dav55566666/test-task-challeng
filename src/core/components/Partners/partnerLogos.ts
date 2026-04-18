/** Все PNG из `src/assets/partners/partner{N}.png`, по возрастанию N. */

const modules = import.meta.glob<{ default: string }>(
  "../../../assets/partners/partner*.png",
  { eager: true }
);

function partnerNum(path: string): number {
  const m = /partner(\d+)\.png$/i.exec(path);
  return m ? Number(m[1]) : 0;
}

export const PARTNER_LOGO_SRCS = Object.entries(modules)
  .sort(([pathA], [pathB]) => partnerNum(pathA) - partnerNum(pathB))
  .map(([, mod]) => mod.default);
