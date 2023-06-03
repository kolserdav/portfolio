-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('ru', 'en');

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "link" VARCHAR(60) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "archive" BOOLEAN NOT NULL DEFAULT false,
    "imageId" INTEGER NOT NULL,
    "lang" "Lang" NOT NULL DEFAULT 'ru',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "full" VARCHAR(100) NOT NULL,
    "desktop" VARCHAR(100) NOT NULL,
    "tablet" VARCHAR(100) NOT NULL,
    "mobile" VARCHAR(100) NOT NULL,
    "small" VARCHAR(100) NOT NULL,
    "coeff" DOUBLE PRECISION NOT NULL,
    "width" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageIndex" (
    "id" SERIAL NOT NULL,
    "metaTitle" VARCHAR(100) NOT NULL DEFAULT 'Портфолио фрилансера',
    "metaDescription" VARCHAR(500) NOT NULL DEFAULT 'Работы по верстке и программированию Кольмиллер Сергея',
    "metaKeywords" VARCHAR(100) NOT NULL DEFAULT 'портфолио,сергей,кольмиллер',
    "headerTitle" VARCHAR(100) NOT NULL,
    "headerSubtitle" VARCHAR(100) NOT NULL,
    "headerDescription" VARCHAR(500) NOT NULL,
    "aboutTitle" VARCHAR(100) NOT NULL,
    "aboutSubtitle" VARCHAR(500) NOT NULL,
    "personalTitle" VARCHAR(100) NOT NULL,
    "personalDescription" VARCHAR(1000) NOT NULL,
    "techTitle" VARCHAR(100) NOT NULL,
    "techDescription" VARCHAR(500) NOT NULL,
    "sliderTitle" VARCHAR(100) NOT NULL,
    "sliderDescription" VARCHAR(500) NOT NULL,
    "cloudTitle" VARCHAR(100) NOT NULL,
    "cloudContent" VARCHAR(2000) NOT NULL,
    "lang" "Lang" NOT NULL DEFAULT 'ru',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tech" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "pageId" INTEGER NOT NULL,
    "lang" "Lang" NOT NULL DEFAULT 'ru',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "PageIndex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
