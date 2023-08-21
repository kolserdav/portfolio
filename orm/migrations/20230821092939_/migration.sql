-- CreateTable
CREATE TABLE "PageResume" (
    "id" SERIAL NOT NULL,
    "metaTitle" VARCHAR(100) NOT NULL DEFAULT 'Веб разработчик',
    "metaDescription" VARCHAR(500) NOT NULL DEFAULT 'Резюме Сергей Кольмиллер',
    "metaKeywords" VARCHAR(100) NOT NULL DEFAULT 'сергей,кольмиллер',
    "lang" "Lang" NOT NULL DEFAULT 'ru',

    CONSTRAINT "PageResume_pkey" PRIMARY KEY ("id")
);
