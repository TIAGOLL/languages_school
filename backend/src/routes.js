const Router = require("express");

const router = Router();

import students_controller from "./controllers/students_controller";

//students
router.get("/students", students_controller.find_all_students);

export { router };
