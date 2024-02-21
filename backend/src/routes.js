import Router from "express";
import { auth } from "./controllers/auth/index";
import { students } from "./controllers/students";
import { books } from "./controllers/books";
import { professionals } from "./controllers/professionals";

const router = Router();

// Auth
router.get("/students/load/infoforauth/:id", auth.GetInfoForAuth);

// Students
router.get("/students/load/booknumber/:email", students.GetBookNumber);
router.get("/students/load/activestudents", students.GetActiveStudents);
router.get("/students/load/studentbyemail/:email", students.GetStudentByEmail);
router.post("/students/create", students.CreateStudent);
router.put("/students/update", students.UpdateStudent);

// Professionals
router.post("/professionals/updateurlphoto", professionals.updateUrlPhoto);

// Books
router.get("/books/load/all", books.GetBooks);

export { router };
