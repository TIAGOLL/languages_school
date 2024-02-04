import Router from "express";
import { auth } from "./controllers/auth/index";
import { students } from "./controllers/students";

const router = Router();

// Auth
router.get("/students/load/infoforauth/:id", auth.GetInfoForAuth);

// Students
router.get("/students/load/booknumber/:email", students.GetBookNumber);
router.get("/students/load/activestudents", students.GetActiveStudents);

// Professionals

export { router };
