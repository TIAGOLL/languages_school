const Router = require("express");
const { auth } = require("./controllers/auth/index");
const { students } = require("./controllers/students");
const { books } = require("./controllers/books");
const { professionals } = require("./controllers/professionals");

const router = Router();

// Auth
router.get("/api/v1/auth/:user/:password", auth.SignIn);

// Students
router.put("/api/v1/std/uploadphoto", students.UploadPhoto);
router.get("/api/v1/std/getLessons/:book/:lesson", students.GetUrlLesson);

// Professionals
router.get("/api/v1/adm/activestudents", professionals.GetActiveStudents);
router.get(
  "/api/v1/adm/studentbyemail/:email",
  professionals.GetStudentByEmail
);
router.get("/api/v1/adm/studentusers", professionals.GetStudentUsers);
router.get("/api/v1/adm/studentemails", professionals.GetStudentEmails);
router.get("/api/v1/adm/emails", professionals.GetEmails);
router.get("/api/v1/adm/users", professionals.GetUsers);
router.get(
  "/api/v1/adm/infoforcreateregistration",
  professionals.GetInfoForCreateRegistration
);
router.get("/api/v1/adm/courses", professionals.GetCourses);
router.get("/api/v1/adm/coursesbyid/:id", professionals.GetCourseById);
router.get("/api/v1/adm/classrooms", professionals.GetClassrooms);
router.get("/api/v1/adm/recordsofstudent", professionals.GetRecordsOfStudent);
router.get("/api/v1/adm/classroombyid/:id", professionals.GetClassroomsById);
router.get("/api/v1/adm/registrations", professionals.GetRegistrations);
router.get("/api/v1/adm/booksbycourse/:course", professionals.GetBooksByCourse);
router.get("/api/v1/adm/lessonbybook/:book", professionals.GetLessonByBook);
router.get("/api/v1/adm/studentscpfs", professionals.GetStudentCpfs);
router.get(
  "/api/v1/adm/adm/professionalscpfs",
  professionals.GetProfessionalsCpfs
);
router.get("/api/v1/adm/registrationstime", professionals.GetRegistrationsTime);
router.put("/api/v1/adm/studentpassword", professionals.UpdateStudentPassword);
router.put(
  "/api/v1/adm/lock/registration",
  professionals.UpdateLockRegistration
);
router.put(
  "/api/v1/adm/registrationstime",
  professionals.UpdateRegistrationsTime
);
router.put("/api/v1/adm/handleclassroom", professionals.HandleClassroom);
router.put("/api/v1/adm/student", professionals.UpdateStudent);
router.put("/api/v1/adm/urlphoto", professionals.UpdateUrlPhoto);
router.put("/api/v1/adm/lesson", professionals.UpdateLesson);
router.delete("/api/v1/adm/registration/:id", professionals.DeleteRegistration);
router.post("/api/v1/adm/registration", professionals.CreateRegistration);
router.post("/api/v1/adm/lesson", professionals.CreateLesson);
router.post(
  "/api/v1/adm/recordofregistration",
  professionals.CreateRecordOfStudent
);
router.put("/api/v1/adm/desactivestudent", professionals.DesactiveStudent);
router.put("/api/v1/adm/course", professionals.UpdateCourse);
router.put(
  "/api/v1/admprofessionalpassword",
  professionals.UpdateProfessionalPassword
);
router.post("/api/v1/adm/", professionals.CreateStudent);
router.post("/api/v1/adm/classroom", professionals.CreateClassroom);
router.put("/api/v1/adm/classroom", professionals.UpdateClassroom);
router.post("/api/v1/adm/course", professionals.CreateCourse);
router.post("/api/v1/adm/book", professionals.CreateBook);
router.put("/api/v1/adm/book", professionals.UpdateBook);
router.post("/api/v1/adm/registration", professionals.CreateRegistration);
router.delete("/api/v1/adm/student", professionals.DeleteStudent);
router.delete("/api/v1/adm/course", professionals.DeleteCourse);
router.delete("/api/v1/adm/book/:id", professionals.DeleteBook);
router.delete("/api/v1/adm/lesson/:id", professionals.DeleteLesson);
router.delete("/api/v1/adm/classroom", professionals.DeleteClassroom);

// Books
router.get("/api/v1/books/all", books.GetBooks);
router.get("/api/v1/students/infoofstudent/:email", students.GetInfoOfStudent);

module.exports = { router };
