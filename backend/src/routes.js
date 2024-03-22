const Router = require("express");
const { auth } = require("./controllers/auth/index");
const { students } = require("./controllers/students");
const { books } = require("./controllers/books");
const { professionals } = require("./controllers/professionals");

const router = Router();

// Auth
router.get("/auth/signin/:user/:password", auth.SignIn);

// Students
router.get("/students/load/book/:email", students.GetBook);
router.put("/students/updateurlphoto", students.UpdateUrlPhoto);

// Professionals
router.get(
  "/professionals/load/activestudents",
  professionals.GetActiveStudents
);
router.get(
  "/professionals/load/studentbyemail/:email",
  professionals.GetStudentByEmail
);
router.get("/professionals/load/studentusers", professionals.GetStudentUsers);
router.get("/professionals/load/studentemails", professionals.GetStudentEmails);
router.get("/professionals/load/emails", professionals.GetEmails);
router.get("/professionals/load/users", professionals.GetUsers);
router.get(
  "/professionals/load/infoforcreateregistration",
  professionals.GetInfoForCreateRegistration
);
router.get(
  "/professionals/load/createregistration",
  professionals.CreateRegistration
);
router.get("/professionals/load/courses", professionals.GetCourses);
router.get("/professionals/load/classrooms", professionals.GetClassrooms);
router.get("/professionals/load/registrations", professionals.GetRegistrations);
router.put(
  "/professionals/update/studentpassword",
  professionals.UpdateStudentPassword
);
router.put("/professionals/update", professionals.UpdateStudent);
router.put("/professionals/update/urlphoto", professionals.UpdateUrlPhoto);
router.put(
  "/professionals/update/desactivestudent",
  professionals.DesactiveStudent
);
router.put(
  "/professionals/update/updateprofessionalpassword",
  professionals.UpdateProfessionalPassword
);
router.post("/professionals/create", professionals.CreateStudent);
router.post("/professionals/createclassroom", professionals.CreateClassroom);
router.post("/professionals/createcourse", professionals.CreateCourse);
router.post(
  "/professionals/createregistration",
  professionals.CreateRegistration
);
router.delete("/professionals/delete/student", professionals.DeleteStudent);

// Books
router.get("/books/load/all", books.GetBooks);

module.exports = { router };
