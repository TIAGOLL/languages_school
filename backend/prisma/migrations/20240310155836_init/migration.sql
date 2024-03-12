-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `number` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classrooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `books_id` INTEGER NOT NULL,
    `courses_id` INTEGER NOT NULL,
    `professionals_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_classes_books1_idx`(`books_id`),
    INDEX `fk_classes_courses1_idx`(`courses_id`),
    INDEX `fk_classrooms_professionals1_idx`(`professionals_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professionals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(11) NOT NULL,
    `name` VARCHAR(90) NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(11) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `active` BIT(1) NOT NULL DEFAULT b'1',
    `admin` BIT(1) NOT NULL DEFAULT b'0',
    `role_id` INTEGER NOT NULL,
    `avatar_url` VARCHAR(200) NULL,
    `password` VARCHAR(128) NOT NULL,
    `user` VARCHAR(128) NOT NULL,
    `adresses_id` INTEGER NOT NULL,

    UNIQUE INDEX `cpf_UNIQUE`(`cpf`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_professionals_role1_idx`(`role_id`),
    INDEX `fk_professionals_adresses1_idx`(`adresses_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `name` VARCHAR(45) NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `phone` VARCHAR(11) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `date_of_birth` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(45) NULL,
    `avatar_url` VARCHAR(500) NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` VARCHAR(45) NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',
    `books_id` INTEGER NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `user` VARCHAR(128) NOT NULL,
    `adresses_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_students_books1_idx`(`books_id`),
    INDEX `fk_students_adresses1_idx`(`adresses_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(45) NULL,
    `zip_code` VARCHAR(45) NULL,
    `district` VARCHAR(45) NULL,
    `complement` VARCHAR(45) NULL,
    `city` VARCHAR(45) NULL,
    `state` VARCHAR(45) NULL,
    `number` VARCHAR(45) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `id` INTEGER NOT NULL,
    `theme` VARCHAR(200) NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `students_id` INTEGER NOT NULL,
    `classes_id` INTEGER NOT NULL,

    INDEX `fk_classes_classes1_idx`(`classes_id`),
    INDEX `fk_classes_students1_idx`(`students_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students_has_classrooms` (
    `students_id` INTEGER NOT NULL,
    `classrooms_id` INTEGER NOT NULL,

    INDEX `fk_students_has_classrooms_classrooms1_idx`(`classrooms_id`),
    INDEX `fk_students_has_classrooms_students1_idx`(`students_id`),
    PRIMARY KEY (`students_id`, `classrooms_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(95) NULL,
    `states_id` INTEGER NOT NULL,

    INDEX `fk_cities_states1_idx`(`states_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(95) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `states` (
    `id` INTEGER NOT NULL,
    `abbr` VARCHAR(2) NULL,
    `name` VARCHAR(45) NULL,
    `countries_id` INTEGER NOT NULL,

    INDEX `fk_states_countries1_idx`(`countries_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classrooms` ADD CONSTRAINT `fk_classes_books1` FOREIGN KEY (`books_id`) REFERENCES `books`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `classrooms` ADD CONSTRAINT `fk_classes_courses1` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `classrooms` ADD CONSTRAINT `fk_classrooms_professionals1` FOREIGN KEY (`professionals_id`) REFERENCES `professionals`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professionals` ADD CONSTRAINT `fk_professionals_adresses1` FOREIGN KEY (`adresses_id`) REFERENCES `adresses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professionals` ADD CONSTRAINT `fk_professionals_role1` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `fk_students_adresses1` FOREIGN KEY (`adresses_id`) REFERENCES `adresses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `fk_students_books1` FOREIGN KEY (`books_id`) REFERENCES `books`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_classes1` FOREIGN KEY (`classes_id`) REFERENCES `classrooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_students1` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students_has_classrooms` ADD CONSTRAINT `fk_students_has_classrooms_classrooms1` FOREIGN KEY (`classrooms_id`) REFERENCES `classrooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students_has_classrooms` ADD CONSTRAINT `fk_students_has_classrooms_students1` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `fk_cities_states1` FOREIGN KEY (`states_id`) REFERENCES `states`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `states` ADD CONSTRAINT `fk_states_countries1` FOREIGN KEY (`countries_id`) REFERENCES `countries`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
