-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `fk_classes_classes1`;

-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `fk_classes_professionals1`;

-- DropForeignKey
ALTER TABLE `classrooms` DROP FOREIGN KEY `fk_classes_books1`;

-- DropForeignKey
ALTER TABLE `classrooms` DROP FOREIGN KEY `fk_classes_courses1`;

-- DropForeignKey
ALTER TABLE `professionals` DROP FOREIGN KEY `fk_professionals_adresses1`;

-- DropForeignKey
ALTER TABLE `professionals` DROP FOREIGN KEY `fk_professionals_role1`;

-- DropForeignKey
ALTER TABLE `registration` DROP FOREIGN KEY `fk_registration_courses1`;

-- DropForeignKey
ALTER TABLE `registration` DROP FOREIGN KEY `fk_registration_students1`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `fk_students_adresses1`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `fk_students_books1`;

-- DropForeignKey
ALTER TABLE `students_has_classrooms` DROP FOREIGN KEY `fk_students_has_classrooms_classrooms1`;

-- DropForeignKey
ALTER TABLE `students_has_classrooms` DROP FOREIGN KEY `fk_students_has_classrooms_students1`;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_classes1` FOREIGN KEY (`classes_id`) REFERENCES `classrooms`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_professionals1` FOREIGN KEY (`professionals_id`) REFERENCES `professionals`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `classrooms` ADD CONSTRAINT `fk_classes_books1` FOREIGN KEY (`books_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `classrooms` ADD CONSTRAINT `fk_classes_courses1` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `professionals` ADD CONSTRAINT `fk_professionals_adresses1` FOREIGN KEY (`adresses_id`) REFERENCES `adresses`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `professionals` ADD CONSTRAINT `fk_professionals_role1` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registration` ADD CONSTRAINT `fk_registration_courses1` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registration` ADD CONSTRAINT `fk_registration_students1` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `fk_students_adresses1` FOREIGN KEY (`adresses_id`) REFERENCES `adresses`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `fk_students_books1` FOREIGN KEY (`books_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students_has_classrooms` ADD CONSTRAINT `fk_students_has_classrooms_classrooms1` FOREIGN KEY (`classrooms_id`) REFERENCES `classrooms`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students_has_classrooms` ADD CONSTRAINT `fk_students_has_classrooms_students1` FOREIGN KEY (`students_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
