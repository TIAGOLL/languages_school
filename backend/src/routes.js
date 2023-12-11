const Router = require("express");

const router = Router();

import bookPage from "./controllers/pageControllers/bookPage";
import professionalsController from "./controllers/professionalsController";
import signInController from "./controllers/signInController";
import studentsController from "./controllers/studentsController";
import studentsAdmController from "./controllers/pageControllers/studentsAdmPage";
import professionalsAdmPage from "./controllers/pageControllers/professionalsAdmPage";

//students
router.get("/students", studentsController.findAllStudents);
router.get("/students/:id", studentsController.findStudentsByEmail);
router.put("/students", studentsController.updateStudent);
router.put("/students/firstlogin", signInController.firstLogin);

//professionals
router.get("/professionals", professionalsController.loadData);

//Book
router.get("/bookpage/:email", bookPage.loadData);

//Students ADM
router.get("/studentsadmpage", studentsAdmController.loadData);

//profesionals ADM
router.get("/professionalsadmpage", professionalsAdmPage.loadData);

export { router };
