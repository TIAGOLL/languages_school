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
		UploadPhoto: async (id, photo) => {
			const uploadRef = ref(storage, `photos/students/${id}`);
			await uploadBytes(uploadRef, photo)
				.then((snapshot) => {
					getDownloadURL(snapshot.ref).then(async (downloadURL) => {
						await axios
							.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/students/updateurlphoto`, {
								id: id,
								avatar_url: downloadURL,
							})
							.then((res) => {
								toast.success(res.data.message);
							})
							.catch((err) => {
								console.log(err.message);
								toast.error("Erro ao atualizar foto!");
							});
					});
				})
				.catch((error) => {
					console.log(error.message);
					toast.error("Erro ao atualizar foto!");
				});
		},

		GetBook: async (email) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/students/load/book/${email}`);
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
		CreateRegistration: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/createregistration`, data);
			return response.data;
		},

		GetRegistrations: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/registrations`);
			return response.data;
		},

		CreateClassroom: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/createclassroom`, data);
			return response.data;
		},

		GetClassrooms: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/classrooms`);
			return response.data;
		},

		GetInfoForCreateRegistration: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/infoforcreateregistration`);
			return response.data;
		},

		CreateCourse: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/createcourse`, data);
			return response.data;
		},

		GetCourses: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/courses`);
			return response.data;
		},

		UpdateProfessionalPassword: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update/updateprofessionalpassword`, data);
			return response.data;
		},

		DeleteStudent: async (id, adresses_id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/delete/student`, {
				data: {
					id: id,
					adresses_id: adresses_id,
				},
			});
			return response.data;
		},

		DesactiveStudent: async (id) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update/desactivestudent`, {
				id: id,
			});
			return response.data;
		},

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
							.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update/urlphoto`, {
								id: id,
								avatar_url: downloadURL,
							})
							.then((res) => {
								toast.success(res.data.message);
							})
							.catch((err) => {
								console.log(err.message);
								toast.error("Erro ao atualizar foto!");
							});
					});
				})
				.catch((error) => {
					console.log(error.message);
					toast.error("Erro ao atualizar!");
				});
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
};

export default api;
