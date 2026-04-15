import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import {
  ProjectSplitLayout,
  ProjectSplitPrompt,
  caseStudyBodyCopyClass,
} from "../../components";
import { IMAGES } from "../../design";
import { findDirectionBySlug, useMainDirectionsStore } from "../../../store";

export const DirectionDetail = () => {
  const { directionSlug } = useParams<{ directionSlug: string }>();
  const items = useMainDirectionsStore((s) => s.items);
  const direction = useMemo(
    () => findDirectionBySlug(items, directionSlug),
    [items, directionSlug]
  );

  if (!directionSlug || !direction) {
    return <Navigate to="/" replace />;
  }

  const paragraphs = direction.detailDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <ProjectSplitLayout
      as="main"
      aria-label={direction.title}
      className="pb-10"
      sidebar={() => (
        <>
          <Link
            to="/"
            className="product-detail__back mb-5 inline-flex items-center gap-2 text-[15px] font-medium text-[#333333] no-underline md:mb-6"
          >
            <img
              src={IMAGES.arrow}
              alt=""
              width={18}
              height={18}
              className="rotate-180 opacity-70"
              aria-hidden
            />
            Назад
          </Link>

          <div className="flex flex-col">
            <h1 className="m-0 mb-5 text-4xl font-normal text-[#9584b8]">
              {direction.title}
            </h1>
            {paragraphs.map((block, index) => (
              <p
                key={index}
                className={`${caseStudyBodyCopyClass} mb-4 last:mb-0`}
              >
                {block}
              </p>
            ))}
          </div>

          <ProjectSplitPrompt className="mt-6 md:mt-0" />
        </>
      )}
    >
      <div className="direction-detail__visual min-h-[220px] rounded-2xl bg-gradient-to-br from-[#c7c4f0]/35 via-[#718df1]/20 to-[#86d9fa]/35 px-6 py-10 md:min-h-[320px]">
        <p className="m-0 max-w-md text-[15px] leading-snug text-[#333]/70">
          Направление: {direction.title}. Здесь можно разместить кейс, цифры или
          дополнительный визуал.
        </p>
      </div>
    </ProjectSplitLayout>
  );
};
