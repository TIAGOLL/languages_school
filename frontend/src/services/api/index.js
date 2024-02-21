import axios from "axios";
import { storage } from "../auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

    GetStudentByEmail: async (email) => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_BASE_API_URL
        }/students/load/studentbyemail/${email}`
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
      return response.data;
    },

    UpdateStudent: async (data) => {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_BASE_API_URL}/students/update`,
        data
      );
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

  professionals: {
    uploadPhoto: async (id, photo) => {
      const uploadRef = ref(storage, `photos/professionals/${id}`);
      console.log(id);
      await uploadBytes(uploadRef, photo)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await axios
              .post(
                `${
                  import.meta.env.VITE_REACT_BASE_API_URL
                }/professionals/updateurlphoto`,
                {
                  id: id,
                  avatar_url: downloadURL,
                }
              )
              .then((res) => {
                console.log(res.data);
                toast.success(res.data.message);
              })
              .catch((err) => {
                console.log(err.message);
                toast.error("Erro ao criar produto");
              });
          });
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Erro ao atualizar!");
        });
    },
  },

  courses: {},

  classrooms: {},
};

export default api;
