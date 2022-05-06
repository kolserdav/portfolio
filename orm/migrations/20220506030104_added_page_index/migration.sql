-- CreateTable
CREATE TABLE `PageIndex` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tech` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `pageId` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tech` ADD CONSTRAINT `Tech_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `PageIndex`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
