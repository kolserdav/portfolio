-- CreateTable
CREATE TABLE `Job` (
    `id` VARCHAR(191) NOT NULL,
    `priority` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `link` VARCHAR(60) NULL,
    `description` VARCHAR(500) NOT NULL,
    `archive` BOOLEAN NOT NULL DEFAULT false,
    `imageId` INTEGER NOT NULL,
    `lang` ENUM('ru', 'en') NOT NULL DEFAULT 'ru',
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full` VARCHAR(100) NOT NULL,
    `desktop` VARCHAR(100) NOT NULL,
    `tablet` VARCHAR(100) NOT NULL,
    `mobile` VARCHAR(100) NOT NULL,
    `small` VARCHAR(100) NOT NULL,
    `coeff` DOUBLE NOT NULL,
    `width` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageIndex` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metaTitle` VARCHAR(100) NOT NULL DEFAULT 'Портфолио фрилансера',
    `metaDescription` VARCHAR(500) NOT NULL DEFAULT 'Работы по верстке и программированию Кольмиллер Сергея',
    `metaKeywords` VARCHAR(100) NOT NULL DEFAULT 'портфолио,сергей,кольмиллер',
    `headerTitle` VARCHAR(100) NOT NULL,
    `headerSubtitle` VARCHAR(100) NOT NULL,
    `headerDescription` VARCHAR(500) NOT NULL,
    `aboutTitle` VARCHAR(100) NOT NULL,
    `aboutSubtitle` VARCHAR(500) NOT NULL,
    `personalTitle` VARCHAR(100) NOT NULL,
    `personalDescription` VARCHAR(1000) NOT NULL,
    `techTitle` VARCHAR(100) NOT NULL,
    `techDescription` VARCHAR(500) NOT NULL,
    `sliderTitle` VARCHAR(100) NOT NULL,
    `sliderDescription` VARCHAR(500) NOT NULL,
    `cloudTitle` VARCHAR(100) NOT NULL,
    `cloudContent` VARCHAR(2000) NOT NULL,
    `lang` ENUM('ru', 'en') NOT NULL DEFAULT 'ru',
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageResume` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metaTitle` VARCHAR(100) NOT NULL DEFAULT 'Веб разработчик',
    `metaDescription` VARCHAR(500) NOT NULL DEFAULT 'Резюме Сергей Кольмиллер',
    `metaKeywords` VARCHAR(100) NOT NULL DEFAULT 'сергей,кольмиллер',
    `printVersion` VARCHAR(100) NOT NULL DEFAULT 'Версия для печати',
    `lang` ENUM('ru', 'en') NOT NULL DEFAULT 'ru',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tech` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `pageId` INTEGER NOT NULL,
    `lang` ENUM('ru', 'en') NOT NULL DEFAULT 'ru',
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tech` ADD CONSTRAINT `Tech_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `PageIndex`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
