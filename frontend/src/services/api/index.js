import axios from "axios";
import { storage } from "../auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const api = {
	auth: {
		signIn: async (user, password) => {
			return await axios
				.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/auth/signin/${user}/${password}`)
				.then((res) => {
					return res.data;
				})
				.catch((err) => {
					toast.error(err.response.data.message);
					return null;
				});
		},
	},
	students: {
		GetBook: async (email) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/students/load/book/${email}`);
			return response.data;
		},

		GetStudentByEmail: async (email) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/studentbyemail/${email}`);
			return response.data;
		},

		GetActiveStudents: async (name, email, book) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/activestudents`, {
				params: {
					name: name ?? "",
					email: email ?? "",
					book: book ?? "",
				},
			});
			return response.data.students;
		},

		CreateStudent: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/create`, data);
			return response.data;
		},

		UpdateStudent: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update`, data);
			return response.data;
		},

		GetStudentUsers: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/studentusers`);
			return response.data;
		},
		GetStudentEmails: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/studentemails`);
			return response.data;
		},
	},

	books: {
		GetBooks: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/books/load/all`);
			return response.data;
		},
	},

	professionals: {
		UpdateStudentPassword: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update/studentpassword`, data);
			return response.data;
		},

		GetEmails: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/emails`);
			return response.data;
		},

		GetUsers: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/users`);
			return response.data;
		},

		UploadPhoto: async (id, photo) => {
			const uploadRef = ref(storage, `photos/professionals/${id}`);
			await uploadBytes(uploadRef, photo)
				.then((snapshot) => {
					getDownloadURL(snapshot.ref).then(async (downloadURL) => {
						await axios
							.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/updateurlphoto`, {
								id: id,
								avatar_url: downloadURL,
							})
							.then((res) => {
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
