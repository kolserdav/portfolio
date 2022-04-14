/*
  Warnings:

  - You are about to drop the column `src` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Job` table. All the data in the column will be lost.
  - Added the required column `desktop` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tablet` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `src`,
    ADD COLUMN `desktop` VARCHAR(191) NOT NULL,
    ADD COLUMN `full` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobile` VARCHAR(191) NOT NULL,
    ADD COLUMN `tablet` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Job` DROP COLUMN `images`,
    ADD COLUMN `imageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
