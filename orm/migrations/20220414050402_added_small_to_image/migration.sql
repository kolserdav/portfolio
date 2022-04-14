/*
  Warnings:

  - Added the required column `small` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` ADD COLUMN `small` VARCHAR(191) NOT NULL;
