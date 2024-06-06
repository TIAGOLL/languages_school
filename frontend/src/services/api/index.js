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
								console.log(err.response.data.message);
								toast.error("Erro ao atualizar foto!");
							});
					});
				})
				.catch((error) => {
					console.log(error.message);
					toast.error("Erro ao atualizar foto!");
				});
		},

		GetUrlLesson: async (book, lesson) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/book/getLessons/${book}/${lesson}`);
			return response.data.url;
		},

		GetBook: async (email, course) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/students/load/book/${email}/${course}`);
			return response.data;
		},

		GetInfoOfStudent: async (email) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/students/load/infoofstudent/${email}`);
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
		CreateLesson: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/create/lesson`, data);
			return response.data;
		},

		UpdateLesson: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update/lesson`, data);
			return response.data;
		},

		GetLessonByBook: async (course) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/lessonbybook/${course}`);
			return response.data;
		},

		DeleteLesson: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/delete/lesson/${id}`);
			return response.data;
		},

		UpdateBook: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update/book`, data);
			return response.data;
		},

		DeleteBook: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/delete/book/${id}`);
			return response.data;
		},

		GetBooksByCourse: async (course) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/booksbycourse/${course}`);
			return response.data;
		},

		CreateBook: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/create/book`, data);
			return response.data;
		},

		HandleClassroom: async (classroomId, registrationId) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/handleclassroom`, {
				classroomId,
				registrationId,
			});
			return response.data;
		},

		GetCourseById: async (id) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/coursesbyid/${id}`);
			return response.data;
		},

		UpdateCourse: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update/course`, data);
			return response.data;
		},

		DeleteCourse: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/delete/course`, {
				data: {
					id: id,
				},
			});
			return response.data;
		},

		CreateRegistration: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/createregistration`, data);
			return response.data;
		},

		DeleteRegistration: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/delete/registration/${id}`);
			return response.data;
		},

		HandleLockRegistration: async (id) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/lock/registration/${id}`);
			return response.data;
		},

		GetRegistrationById: async (id) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/registrationbyid/${id}`);
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

		UpdateClassroom: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/update/classroom`, data);
			return response.data;
		},

		DeleteClassroom: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/delete/classroom`, {
				data: {
					id: id,
				},
			});
			return response.data;
		},

		GetClassroomById: async (id) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/classroombyid/${id}`);
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
								console.log(err.response.data.message);
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

		GetActiveStudents: async (name, email, course) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/professionals/load/activestudents`, {
				params: {
					name: name ?? "",
					email: email ?? "",
					course: course ?? "",
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
