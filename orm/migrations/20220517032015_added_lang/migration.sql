-- AlterTable
ALTER TABLE `Job` ADD COLUMN `lang` ENUM('ru', 'en') NOT NULL DEFAULT 'ru';

-- AlterTable
ALTER TABLE `PageIndex` ADD COLUMN `lang` ENUM('ru', 'en') NOT NULL DEFAULT 'ru',
    ADD COLUMN `metaDescription` VARCHAR(500) NOT NULL DEFAULT 'Работы по верстке и программированию Кольмиллер Сергея',
    ADD COLUMN `metaKeywords` VARCHAR(100) NOT NULL DEFAULT 'портфолио,сергей,кольмиллер',
    ADD COLUMN `metaTitle` VARCHAR(100) NOT NULL DEFAULT 'Портфолио фрилансера';

-- AlterTable
ALTER TABLE `Tech` ADD COLUMN `lang` ENUM('ru', 'en') NOT NULL DEFAULT 'ru';
