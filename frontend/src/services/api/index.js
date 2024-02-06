import axios from "axios";
import { toast } from "react-toastify";

const api = {
  auth: {
    GetInfoForAuth: async (id) => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_BASE_API_URL
        }/students/load/infoforauth/${id}`
      );
      return response.data.user;
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

    CreateStudent: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BASE_API_URL}/students/create`,
        data
      );
      console.log(response);
      return response.data;
    },
  },

  books: {
    GetBooks: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_BASE_API_URL}/books/load/all`
      );
      return response.data;
    },
  },

  professionals: {},

  courses: {},

  classrooms: {},
};

export default api;
