import axios from "axios";
import { storage } from "../auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const api = {
	auth: {
		signIn: async (user, password) => {
			return await axios
				.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/auth/${user}/${password}`)
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
							.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/uploadphoto`, {
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
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/std/getLessons/${book}/${lesson}`);
			return response.data.url;
		},

		GetInfoOfStudent: async (email) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/students/infoofstudent/${email}`);
			return response.data;
		},
	},

	books: {
		GetBooks: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/books/all`);
			return response.data;
		},
	},

	professionals: {
		CreateLesson: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/lesson`, data);
			return response.data;
		},

		CreateRecordOfStudent: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/recordofregistration`, data);
			return response.data;
		},

		UpdateLesson: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/lesson`, data);
			return response.data;
		},

		GetLessonByBook: async (course) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/lessonbybook/${course}`);
			return response.data;
		},

		DeleteLesson: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/lesson/${id}`);
			return response.data;
		},

		UpdateBook: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/book`, data);
			return response.data;
		},

		DeleteBook: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/book/${id}`);
			return response.data;
		},

		GetBooksByCourse: async (course) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/booksbycourse/${course}`);
			return response.data;
		},

		CreateBook: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/book`, data);
			return response.data;
		},

		HandleClassroom: async (classroomId, registrationId) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/handleclassroom`, {
				classroomId,
				registrationId,
			});
			return response.data;
		},

		GetCourseById: async (id) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/coursesbyid/${id}`);
			return response.data;
		},

		UpdateCourse: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/course`, data);
			return response.data;
		},

		DeleteCourse: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/course`, {
				data: {
					id: id,
				},
			});
			return response.data;
		},

		CreateRegistration: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/registration`, data);
			return response.data;
		},

		DeleteRegistration: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/registration/${id}`);
			return response.data;
		},

		GetRecordsOfStudent: async (studentId) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/recordsofstudent/${studentId}`);
			return response.data;
		},

		HandleLockRegistration: async (registrationId, studentId, description) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/lock/registration`, {
				registrationId,
				studentId,
				description,
			});
			return response.data;
		},

		GetRegistrationById: async (id) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/registrationbyid/${id}`);
			return response.data;
		},

		GetRegistrations: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/registrations`);
			return response.data;
		},

		CreateClassroom: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/classroom`, data);
			return response.data;
		},

		UpdateClassroom: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/classroom`, data);
			return response.data;
		},

		DeleteClassroom: async (id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/classroom`, {
				data: {
					id: id,
				},
			});
			return response.data;
		},

		GetClassroomById: async (id) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/classroombyid/${id}`);
			return response.data;
		},

		GetClassrooms: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/classrooms`);
			return response.data;
		},

		GetInfoForCreateRegistration: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/infoforcreateregistration`);
			return response.data;
		},

		CreateCourse: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/admcourse`, data);
			return response.data;
		},

		GetCourses: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/courses`);
			return response.data;
		},

		UpdateProfessionalPassword: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/professionalpassword`, data);
			return response.data;
		},

		DeleteStudent: async (id, adresses_id) => {
			const response = await axios.delete(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/student`, {
				data: {
					id: id,
					adresses_id: adresses_id,
				},
			});
			return response.data;
		},

		DesactiveStudent: async (id) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/desactivestudent`, {
				id: id,
			});
			return response.data;
		},

		UpdateStudentPassword: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/studentpassword`, data);
			return response.data;
		},

		GetEmails: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/emails`);
			return response.data;
		},

		GetUsers: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/users`);
			return response.data;
		},

		UploadPhoto: async (id, photo) => {
			const uploadRef = ref(storage, `photos/adm/${id}`);
			await uploadBytes(uploadRef, photo)
				.then((snapshot) => {
					getDownloadURL(snapshot.ref).then(async (downloadURL) => {
						await axios
							.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/urlphoto`, {
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
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/studentbyemail/${email}`);
			return response.data;
		},

		GetActiveStudents: async (name, email, course) => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/activestudents`, {
				params: {
					name: name ?? "",
					email: email ?? "",
					course: course ?? "",
				},
			});
			return response.data.students;
		},

		CreateStudent: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm`, data);
			return response.data;
		},

		UpdateStudent: async (data) => {
			const response = await axios.put(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/student`, data);
			return response.data;
		},

		GetStudentUsers: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/studentusers`);
			return response.data;
		},
		GetStudentEmails: async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/adm/studentemails`);
			return response.data;
		},
	},
};

export default api;
