/*
  Warnings:

  - You are about to alter the column `desktop` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `full` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `mobile` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `tablet` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `small` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `link` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `Image` MODIFY `desktop` VARCHAR(50) NOT NULL,
    MODIFY `full` VARCHAR(50) NOT NULL,
    MODIFY `mobile` VARCHAR(50) NOT NULL,
    MODIFY `tablet` VARCHAR(50) NOT NULL,
    MODIFY `small` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Job` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `link` VARCHAR(50) NOT NULL,
    MODIFY `description` VARCHAR(1000) NOT NULL;
