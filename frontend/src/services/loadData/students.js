import axios from "axios";

export default {
  async findAllStudents() {
    try {
      const students = await axios.get("http://localhost:3030/students");
      return students.data;
    } catch (error) {
      console.log(error);
    }
  },

  async findStudentsByEmail(email) {
    const student = await axios.get(`http://localhost:3030/students/${email}`);
    return student.data;
  },
};
