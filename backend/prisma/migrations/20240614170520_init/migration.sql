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
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth` (
    `token` VARCHAR(500) NOT NULL,
    `type` VARCHAR(45) NOT NULL DEFAULT 'Bearer',
    `expires_at` DATETIME(0) NOT NULL,
    `refresh_token` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `token_UNIQUE`(`token`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boleto_api` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `developer_application_key` VARCHAR(200) NOT NULL,
    `client_id` VARCHAR(200) NOT NULL,
    `client_secret` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courses_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `position` INTEGER NOT NULL,

    INDEX `fk_books_courses1_idx`(`courses_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `theme` VARCHAR(200) NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `professionals_id` INTEGER NOT NULL,
    `classrooms_id` INTEGER NOT NULL,
    `presence_list_id` INTEGER NOT NULL,

    INDEX `fk_classes_classrooms1_idx`(`classrooms_id`),
    INDEX `fk_classes_presence_list1_idx`(`presence_list_id`),
    INDEX `fk_classes_professionals1_idx`(`professionals_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classrooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(45) NOT NULL,
    `hour` VARCHAR(45) NOT NULL,
    `books_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_classrooms_books1_idx`(`books_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registrations_time` INTEGER NULL DEFAULT 6,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `price` FLOAT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lessons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `books_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NULL,
    `url` VARCHAR(200) NULL,
    `position` INTEGER NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_lesson_books1_idx`(`books_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monthly_fee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registrations_id` INTEGER NOT NULL,
    `due_date` DATETIME(0) NULL,
    `amount_to_be_paid` FLOAT NULL,
    `amount_paid` FLOAT NULL DEFAULT 0,
    `date_of_paid` DATETIME(0) NULL,
    `payment_method` VARCHAR(45) NULL,
    `paid` BIT(1) NULL DEFAULT b'0',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_monthly_fee_registrations1_idx`(`registrations_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_classes` BIT(1) NULL DEFAULT b'0',
    `update_classes` BIT(1) NULL DEFAULT b'0',
    `delete_classes` BIT(1) NULL DEFAULT b'0',
    `update_students` BIT(1) NULL DEFAULT b'0',
    `delete_students` BIT(1) NULL,
    `create_students` BIT(1) NULL DEFAULT b'0',
    `update_professionals` BIT(1) NULL DEFAULT b'0',
    `create_professionals` BIT(1) NULL DEFAULT b'0',
    `delete_professionals` BIT(1) NULL DEFAULT b'0',
    `create_registrations` BIT(1) NULL DEFAULT b'0',
    `update_registrations` BIT(1) NULL DEFAULT b'0',
    `delete_registrations` BIT(1) NULL DEFAULT b'0',
    `dashboard` BIT(1) NULL DEFAULT b'0',
    `create_courses` BIT(1) NULL DEFAULT b'0',
    `update_courses` BIT(1) NULL DEFAULT b'0',
    `delete_courses` BIT(1) NULL DEFAULT b'0',
    `create_classrooms` BIT(1) NULL DEFAULT b'0',
    `update_classrooms` BIT(1) NULL DEFAULT b'0',
    `delete_classrooms` BIT(1) NULL DEFAULT b'0',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presence_list` (
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professionals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `adresses_id` INTEGER NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `name` VARCHAR(90) NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(11) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',
    `admin` BIT(1) NOT NULL DEFAULT b'1',
    `avatar_url` VARCHAR(200) NULL,
    `password` VARCHAR(128) NOT NULL,
    `user` VARCHAR(128) NOT NULL,
    `hour_value` FLOAT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    UNIQUE INDEX `cpf_UNIQUE`(`cpf`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_professionals_adresses1_idx`(`adresses_id`),
    INDEX `fk_professionals_role1_idx`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `students_id` INTEGER NOT NULL,
    `courses_id` INTEGER NOT NULL,
    `start_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `end_date` DATETIME(0) NOT NULL,
    `monthly_fee_amount` FLOAT NULL DEFAULT 0,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `locked` BIT(1) NOT NULL DEFAULT b'0',
    `completed` BIT(1) NOT NULL DEFAULT b'0',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_registrations_courses1_idx`(`courses_id`),
    INDEX `fk_registrations_students1_idx`(`students_id`),
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
    `adresses_id` INTEGER NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `name` VARCHAR(90) NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `phone` VARCHAR(11) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `date_of_birth` DATETIME(0) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `user` VARCHAR(128) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `avatar_url` VARCHAR(500) NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `active` BIT(1) NOT NULL DEFAULT b'1',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    UNIQUE INDEX `user_UNIQUE`(`user`),
    INDEX `fk_students_adresses1_idx`(`adresses_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students_has_classrooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registrations_id` INTEGER NOT NULL,
    `classrooms_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `registrations_id_UNIQUE`(`registrations_id`),
    INDEX `fk_students_has_classrooms_classrooms1_idx`(`classrooms_id`),
    INDEX `fk_students_has_classrooms_registrations1_idx`(`registrations_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `scores_id` INTEGER NOT NULL,
    `registrations_id` INTEGER NOT NULL,
    `lessons_id` INTEGER NOT NULL,
    `date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `response` VARCHAR(1000) NULL,
    `score_obtained` FLOAT NULL,
    `question` VARCHAR(1000) NULL,
    `total_score` FLOAT NULL,

    INDEX `fk_responses_lessons1_idx`(`lessons_id`),
    INDEX `fk_responses_registrations1_idx`(`registrations_id`),
    PRIMARY KEY (`scores_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `records_of_students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `students_id` INTEGER NOT NULL,
    `description` VARCHAR(1000) NULL,
    `title` VARCHAR(100) NULL,
    `date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_records_students1`(`students_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `fk_books_courses1` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_classrooms1` FOREIGN KEY (`classrooms_id`) REFERENCES `classrooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_presence_list1` FOREIGN KEY (`presence_list_id`) REFERENCES `presence_list`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_professionals1` FOREIGN KEY (`professionals_id`) REFERENCES `professionals`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `classrooms` ADD CONSTRAINT `fk_classrooms_books1` FOREIGN KEY (`books_id`) REFERENCES `books`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `fk_lesson_books1` FOREIGN KEY (`books_id`) REFERENCES `books`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `monthly_fee` ADD CONSTRAINT `fk_monthly_fee_registrations1` FOREIGN KEY (`registrations_id`) REFERENCES `registrations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professionals` ADD CONSTRAINT `fk_professionals_adresses1` FOREIGN KEY (`adresses_id`) REFERENCES `adresses`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `professionals` ADD CONSTRAINT `fk_professionals_role1` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `fk_registrations_courses1` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `fk_registrations_students1` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `fk_students_adresses1` FOREIGN KEY (`adresses_id`) REFERENCES `adresses`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students_has_classrooms` ADD CONSTRAINT `fk_students_has_classrooms_classrooms1` FOREIGN KEY (`classrooms_id`) REFERENCES `classrooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students_has_classrooms` ADD CONSTRAINT `fk_students_has_classrooms_registrations1` FOREIGN KEY (`registrations_id`) REFERENCES `registrations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `fk_responses_lessons1` FOREIGN KEY (`lessons_id`) REFERENCES `lessons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `fk_responses_registrations1` FOREIGN KEY (`registrations_id`) REFERENCES `registrations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `records_of_students` ADD CONSTRAINT `fk_records_students1` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
