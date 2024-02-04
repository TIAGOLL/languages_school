import axios from "axios";

const api = {
  auth: {
    GetInfoForAuth: async (id) => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_BASE_API_URL
        }/students/load/infoforauth/${id}`
      );
      return response.data.student;
    },
  },
  students: {
    GetBookNumber: async (email) => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_BASE_API_URL
        }/students/load/booknumber/${email}`
      );
      return response.data;
    },

    GetActiveStudents: async (name, email, book) => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_BASE_API_URL
        }/students/load/activestudents`,
        {
          params: {
            name: name ?? "",
            email: email ?? "",
            book: book ?? "",
          },
        }
      );
      return response.data.students;
    },
  },

  professionals: {},

  courses: {},

  classrooms: {},
};

export default api;
