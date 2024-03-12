/*
  Warnings:

  - You are about to drop the column `students_id` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `professionals_id` on the `classrooms` table. All the data in the column will be lost.
  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `states` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `professionals_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `classrooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cities` DROP FOREIGN KEY `fk_cities_states1`;

-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `fk_classes_students1`;

-- DropForeignKey
ALTER TABLE `classrooms` DROP FOREIGN KEY `fk_classrooms_professionals1`;

-- DropForeignKey
ALTER TABLE `states` DROP FOREIGN KEY `fk_states_countries1`;

-- AlterTable
ALTER TABLE `adresses` ADD COLUMN `active` BIT(1) NOT NULL DEFAULT b'1';

-- AlterTable
ALTER TABLE `classes` DROP COLUMN `students_id`,
    ADD COLUMN `professionals_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `classrooms` DROP COLUMN `professionals_id`,
    ADD COLUMN `date` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `professionals` MODIFY `admin` BIT(1) NOT NULL DEFAULT b'1';

-- DropTable
DROP TABLE `cities`;

-- DropTable
DROP TABLE `countries`;

-- DropTable
DROP TABLE `states`;

-- CreateTable
CREATE TABLE `registration` (
    `id` INTEGER NOT NULL,
    `courses_id` INTEGER NOT NULL,
    `students_id` INTEGER NOT NULL,

    INDEX `fk_registration_courses1_idx`(`courses_id`),
    INDEX `fk_registration_students1_idx`(`students_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_classes_professionals1_idx` ON `classes`(`professionals_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_UNIQUE` ON `students`(`user`);

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_professionals1` FOREIGN KEY (`professionals_id`) REFERENCES `professionals`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `registration` ADD CONSTRAINT `fk_registration_courses1` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `registration` ADD CONSTRAINT `fk_registration_students1` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
