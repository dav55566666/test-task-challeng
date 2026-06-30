import { PROJECT_ASSETS } from "../design/projectAssets";
import type { ProjectGalleryLayout } from "./projectGalleryTypes";

const CASE_DESCRIPTION =
  "Соединили правила двух миров: перевели фарм-код на язык лайфстайл. в супер заклаттеренной категории и превратили брендбилдинг из стратегии в реальность: от дизайна упаковки - к громкому ивенту, стримам и экспертным контентом, кулинарным шоу.";

export type OurProjectCase = {
  slug: string;
  title: string;
  description: string;
  imageAlt: string;
  image: string;
  tabValue: string;
  galleryImages: readonly string[];
  galleryLayout: ProjectGalleryLayout;
};

const goldnApothekaLayout: ProjectGalleryLayout = [
  { images: [{ index: 0, width: 1398, height: 786 }] },
  {
    images: [
      { index: 1, width: 698, height: 392 },
      { index: 2, width: 698, height: 392 },
    ],
  },
  {
    images: [
      { index: 3, width: 698, height: 1046 },
      { index: 4, width: 698, height: 1046 },
    ],
  },
  { images: [{ index: 5, width: 1398, height: 2072 }] },
  { images: [{ index: 6, width: 1398, height: 696 }] },
  {
    images: [
      { index: 7, width: 698, height: 1030 },
      { index: 8, width: 698, height: 1030 },
    ],
  },
  { images: [{ index: 9, width: 1398, height: 2092 }] },
  {
    images: [
      { index: 10, width: 698, height: 1052 },
      { index: 11, width: 698, height: 1052 },
    ],
  },
];

const finishGreenLayout: ProjectGalleryLayout = [
  {
    images: [
      { index: 0, width: 463, height: 696 },
      { index: 1, width: 463, height: 696 },
      { index: 2, width: 463, height: 696 },
    ],
  },
  { images: [{ index: 3, width: 1398, height: 786 }] },
  { images: [{ index: 4, width: 1398, height: 786 }] },
  { images: [{ index: 5, width: 1398, height: 786 }] },
  { images: [{ index: 6, width: 698, height: 1030 }] },
  { images: [{ index: 7, width: 1398, height: 786 }] },
  {
    images: [
      { index: 8, width: 698, height: 1030 },
      { index: 9, width: 698, height: 1030 },
    ],
  },
];

const vanishMultiactionLayout: ProjectGalleryLayout = [
  { images: [{ index: 0, width: 1398, height: 786 }] },
  {
    images: [
      { index: 1, width: 463, height: 696 },
      { index: 2, width: 463, height: 696 },
      { index: 3, width: 463, height: 696 },
    ],
  },
  { images: [{ index: 4, width: 1398, height: 700 }] },
  {
    images: [
      { index: 5, width: 698, height: 392 },
      { index: 6, width: 698, height: 392 },
    ],
  },
  {
    images: [
      { index: 7, width: 463, height: 464 },
      { index: 8, width: 463, height: 464 },
      { index: 9, width: 463, height: 464 },
    ],
  },
  { images: [{ index: 10, width: 1398, height: 800 }] },
  {
    images: [
      { index: 11, width: 698, height: 644 },
      { index: 12, width: 698, height: 644 },
    ],
  },
  {
    images: [
      { index: 13, width: 698, height: 644 },
      { index: 14, width: 698, height: 644 },
    ],
  },
  {
    images: [
      { index: 15, width: 1034, height: 566 },
      { index: 16, width: 360, height: 566 },
    ],
  },
  {
    images: [
      { index: 17, width: 698, height: 392 },
      { index: 18, width: 698, height: 392 },
    ],
  },
];

const voltaflexLayout: ProjectGalleryLayout = [
  { images: [{ index: 0, width: 1398, height: 786 }] },
  {
    images: [
      { index: 1, width: 463, height: 696 },
      { index: 2, width: 463, height: 696 },
      { index: 3, width: 463, height: 696 },
    ],
  },
  {
    images: [
      { index: 4, width: 464, height: 616 },
      { index: 5, width: 930, height: 616 },
    ],
  },
  {
    images: [
      { index: 6, width: 463, height: 620 },
      { index: 7, width: 463, height: 620 },
      { index: 8, width: 463, height: 620 },
    ],
  },
  { images: [{ index: 9, width: 1398, height: 800 }] },
  { images: [{ index: 10, width: 698, height: 644 }] },
];

const wooltieLayout: ProjectGalleryLayout = [
  {
    images: [
      { index: 0, width: 698, height: 786 },
      { index: 1, width: 698, height: 786 },
    ],
  },
  { images: [{ index: 2, width: 1398, height: 800 }] },
  {
    images: [
      { index: 3, width: 463, height: 620 },
      { index: 4, width: 463, height: 620 },
      { index: 5, width: 463, height: 620 },
    ],
  },
  {
    images: [
      { index: 6, width: 698, height: 644 },
      { index: 7, width: 698, height: 644 },
    ],
  },
  {
    images: [
      { index: 8, width: 698, height: 644 },
      { index: 9, width: 698, height: 644 },
    ],
  },
  {
    images: [
      { index: 10, width: 698, height: 644 },
      { index: 11, width: 698, height: 644 },
    ],
  },
  {
    images: [
      { index: 12, width: 698, height: 644 },
      { index: 13, width: 698, height: 644 },
    ],
  },
  { images: [{ index: 14, width: 1398, height: 898 }] },
  {
    images: [
      { index: 15, width: 698, height: 644 },
      { index: 16, width: 698, height: 644 },
    ],
  },
  {
    images: [
      { index: 17, width: 698, height: 644 },
      { index: 18, width: 698, height: 644 },
    ],
  },
  {
    images: [
      { index: 19, width: 463, height: 764 },
      { index: 20, width: 463, height: 764 },
      { index: 21, width: 463, height: 764 },
    ],
  },
];

const heinzLayout: ProjectGalleryLayout = [
  { images: [{ index: 0, width: 1398, height: 786 }] },
  { images: [{ index: 1, width: 1398, height: 786 }] },
  {
    images: [
      { index: 2, width: 698, height: 476 },
      { index: 3, width: 698, height: 476 },
    ],
  },
  { images: [{ index: 4, width: 1398, height: 908 }] },
  { images: [{ index: 5, width: 1398, height: 908 }] },
];

const aliexpressLayout: ProjectGalleryLayout = [
  {
    images: [
      { index: 0, width: 463, height: 786 },
      { index: 1, width: 463, height: 786 },
      { index: 2, width: 463, height: 786 },
    ],
  },
  {
    images: [
      { index: 3, width: 463, height: 786 },
      { index: 4, width: 463, height: 786 },
      { index: 5, width: 463, height: 786 },
    ],
  },
  {
    images: [
      { index: 6, width: 463, height: 786 },
      { index: 7, width: 463, height: 786 },
      { index: 8, width: 463, height: 786 },
    ],
  },
  {
    images: [
      { index: 9, width: 463, height: 786 },
      { index: 10, width: 463, height: 786 },
      { index: 11, width: 463, height: 786 },
    ],
  },
  { images: [{ index: 12, width: 1398, height: 1000 }] },
  {
    images: [
      { index: 13, width: 698, height: 644 },
      { index: 14, width: 698, height: 644 },
    ],
  },
  {
    images: [
      { index: 15, width: 463, height: 786 },
      { index: 16, width: 463, height: 786 },
      { index: 17, width: 463, height: 786 },
    ],
  },
];

const axeAnarchyLayout: ProjectGalleryLayout = [
  { images: [{ index: 0, width: 1398, height: 786 }] },
  { images: [{ index: 1, width: 1398, height: 786 }] },
  {
    images: [
      { index: 2, width: 698, height: 476 },
      { index: 3, width: 698, height: 476 },
    ],
  },
  {
    images: [
      { index: 4, width: 698, height: 476 },
      { index: 5, width: 698, height: 476 },
    ],
  },
  { images: [{ index: 6, width: 1398, height: 908 }] },
  { images: [{ index: 7, width: 1398, height: 908 }] },
];

const latteriaSanMarinoLayout: ProjectGalleryLayout = [
  {
    images: [
      { index: 0, width: 463, height: 786 },
      { index: 1, width: 463, height: 786 },
      { index: 2, width: 463, height: 786 },
    ],
  },
  {
    images: [
      { index: 3, width: 463, height: 786 },
      { index: 4, width: 463, height: 786 },
      { index: 5, width: 463, height: 786 },
    ],
  },
  { images: [{ index: 6, width: 1398, height: 1000 }] },
  { images: [{ index: 7, width: 1398, height: 804 }] },
  { images: [{ index: 8, width: 1398, height: 804 }] },
];

const goldnApothekaLineLayout: ProjectGalleryLayout = [
  { images: [{ index: 0, width: 1398, height: 786 }] },
  { images: [{ index: 1, width: 1398, height: 786 }] },
  {
    images: [
      { index: 2, width: 698, height: 476 },
      { index: 3, width: 698, height: 476 },
    ],
  },
  {
    images: [
      { index: 4, width: 698, height: 476 },
      { index: 5, width: 698, height: 476 },
    ],
  },
  { images: [{ index: 6, width: 1398, height: 908 }] },
];

const unileverAxeLayout: ProjectGalleryLayout = [
  {
    images: [
      { index: 0, width: 463, height: 786 },
      { index: 1, width: 463, height: 786 },
      { index: 2, width: 463, height: 786 },
    ],
  },
  {
    images: [
      { index: 3, width: 463, height: 786 },
      { index: 4, width: 463, height: 786 },
      { index: 5, width: 463, height: 786 },
    ],
  },
  {
    images: [
      { index: 6, width: 463, height: 786 },
      { index: 7, width: 463, height: 786 },
      { index: 8, width: 463, height: 786 },
    ],
  },
  { images: [{ index: 9, width: 1398, height: 1000 }] },
  { images: [{ index: 10, width: 1398, height: 804 }] },
  {
    images: [
      { index: 11, width: 698, height: 644 },
      { index: 12, width: 698, height: 644 },
    ],
  },
];

export const OUR_PROJECTS: readonly OurProjectCase[] = [
  {
    slug: "goldn-apotheka",
    title: "Gold'n Apotheka",
    description: CASE_DESCRIPTION,
    imageAlt: "Gold'n Apotheka",
    image: PROJECT_ASSETS.project1.cover,
    tabValue: "campaigns",
    galleryImages: PROJECT_ASSETS.project1.gallery,
    galleryLayout: goldnApothekaLayout,
  },
  {
    slug: "finish-green",
    title: "Finish Green",
    description: CASE_DESCRIPTION,
    imageAlt: "Finish Green",
    image: PROJECT_ASSETS.project2.cover,
    tabValue: "social",
    galleryImages: PROJECT_ASSETS.project2.gallery,
    galleryLayout: finishGreenLayout,
  },
  {
    slug: "vanish-multiaction",
    title: "Vanish Multiaction",
    description: CASE_DESCRIPTION,
    imageAlt: "Vanish Multiaction",
    image: PROJECT_ASSETS.project3.cover,
    tabValue: "branding",
    galleryImages: PROJECT_ASSETS.project3.gallery,
    galleryLayout: vanishMultiactionLayout,
  },
  {
    slug: "voltaflex",
    title: "Вольтафлекс",
    description: CASE_DESCRIPTION,
    imageAlt: "Вольтафлекс",
    image: PROJECT_ASSETS.project4.cover,
    tabValue: "video",
    galleryImages: PROJECT_ASSETS.project4.gallery,
    galleryLayout: voltaflexLayout,
  },
  {
    slug: "wooltie",
    title: "Wooltie",
    description: CASE_DESCRIPTION,
    imageAlt: "Wooltie",
    image: PROJECT_ASSETS.project5.cover,
    tabValue: "ecommerce",
    galleryImages: PROJECT_ASSETS.project5.gallery,
    galleryLayout: wooltieLayout,
  },
  {
    slug: "heinz",
    title: "Heinz",
    description: CASE_DESCRIPTION,
    imageAlt: "Heinz",
    image: PROJECT_ASSETS.project6.cover,
    tabValue: "campaigns",
    galleryImages: PROJECT_ASSETS.project6.gallery,
    galleryLayout: heinzLayout,
  },
  {
    slug: "aliexpress",
    title: "Aliexpress",
    description: CASE_DESCRIPTION,
    imageAlt: "Aliexpress",
    image: PROJECT_ASSETS.project7.cover,
    tabValue: "social",
    galleryImages: PROJECT_ASSETS.project7.gallery,
    galleryLayout: aliexpressLayout,
  },
  {
    slug: "unilever-axe",
    title: "Unilever: AXE",
    description: CASE_DESCRIPTION,
    imageAlt: "Unilever: AXE",
    image: PROJECT_ASSETS.project8.cover,
    tabValue: "branding",
    galleryImages: PROJECT_ASSETS.project8.gallery,
    galleryLayout: unileverAxeLayout,
  },
  {
    slug: "axe-anarchy",
    title: "AXE Anarchy",
    description: CASE_DESCRIPTION,
    imageAlt: "AXE Anarchy",
    image: PROJECT_ASSETS.project9.cover,
    tabValue: "campaigns",
    galleryImages: PROJECT_ASSETS.project9.gallery,
    galleryLayout: axeAnarchyLayout,
  },
  {
    slug: "latteria-san-marino",
    title: "Latteria di San Marino",
    description: CASE_DESCRIPTION,
    imageAlt: "Latteria di San Marino",
    image: PROJECT_ASSETS.project10.cover,
    tabValue: "social",
    galleryImages: PROJECT_ASSETS.project10.gallery,
    galleryLayout: latteriaSanMarinoLayout,
  },
  {
    slug: "goldn-apotheka-line",
    title: "Gold'n Apotheka: линейка",
    description: CASE_DESCRIPTION,
    imageAlt: "Gold'n Apotheka: линейка",
    image: PROJECT_ASSETS.project11.cover,
    tabValue: "branding",
    galleryImages: PROJECT_ASSETS.project11.gallery,
    galleryLayout: goldnApothekaLineLayout,
  },
];
