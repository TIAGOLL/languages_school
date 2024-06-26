import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { courseUpdateSchema, createBookSchema, createLessonSchema, updateBookSchema, updateLessonSchema } from "./schemas";

export const useFormUpdateBooks = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("id");
	const book = searchParams.get("book");

	const { data: course, isLoading } = useQuery({
		queryKey: ["coursesbyid"],
		queryFn: async () => await api.professionals.GetCourseById(id),
	});
	const { data: books, refetch: refetchBooks } = useQuery({
		queryKey: ["booksbycourse"],
		queryFn: async () => await api.professionals.GetBooksByCourse(id),
	});

	const { data: lessonByBook, refetch: refetchLessons } = useQuery({
		queryKey: ["lessonsbybook", book],
		queryFn: async () => {
			if (!book) return;
			return await api.professionals.GetLessonByBook(book);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(courseUpdateSchema),
		mode: "all",
		criteriaMode: "all",
	});

	const {
		register: registerCreateBook,
		handleSubmit: handleSubmitCreateBook,
		formState: { errors: errorsCreateBook },
		watch: watchCreateBook,
		setValue: setValueCreateBook,
	} = useForm({
		resolver: zodResolver(createBookSchema),
		mode: "all",
		criteriaMode: "all",
	});
	const {
		register: registerUpdateBook,
		handleSubmit: handleSubmitUpdateBook,
		formState: { errors: errorsUpdateBook },
		watch: watchUpdateBook,
		setValue: setValueUpdateBook,
	} = useForm({
		resolver: zodResolver(updateBookSchema),
		mode: "all",
		criteriaMode: "all",
	});

	const {
		register: registerCreateLesson,
		handleSubmit: handleSubmitCreateLesson,
		formState: { errors: errorsCreateLesson },
		watch: watchCreateLesson,
		setValue: setValueCreateLesson,
	} = useForm({
		resolver: zodResolver(createLessonSchema),
		mode: "all",
		criteriaMode: "all",
	});

	const {
		register: registerUpdateLesson,
		handleSubmit: handleSubmitUpdateLesson,
		formState: { errors: errorsUpdateLesson },
		watch: watchUpdateLesson,
		setValue: setValueUpdateLesson,
	} = useForm({
		resolver: zodResolver(updateLessonSchema),
		mode: "all",
		criteriaMode: "all",
	});

	async function createLesson(data) {
		await api.professionals
			.CreateLesson(data)
			.then((res) => {
				toast.success(res.message);
				refetchLessons();
				setValueCreateLesson("name", "");
				setValueCreateLesson("position", "");
				setValueCreateLesson("code", "");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message);
			});
	}

	async function updateLesson(data) {
		await api.professionals
			.UpdateLesson(data)
			.then((res) => {
				toast.success(res.message);
				refetchLessons();
				setValueUpdateLesson("name", "");
				setValueUpdateLesson("position", "");
				setValueUpdateLesson("code", "");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message, {
					autoClose: 5000,
				});
			});
	}

	async function updateCourse(data) {
		await api.professionals
			.UpdateCourse({ ...data, id })
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/courses?tab=all");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.message);
			});
	}
	async function createBook(data) {
		await api.professionals
			.CreateBook({ ...data, course: id })
			.then((res) => {
				toast.success(res.message);
				refetchBooks();
				setValueCreateBook("name", "");
				setValueCreateBook("position", "");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message);
			});
	}

	async function deleteBook(id) {
		await api.professionals
			.DeleteBook(id)
			.then((res) => {
				toast.success(res.message);
				refetchBooks();
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message, {
					autoClose: 5000,
				});
			});
	}

	async function updateBook(data) {
		console.log(data);
		await api.professionals
			.UpdateBook(data)
			.then((res) => {
				toast.success(res.message);
				refetchBooks();
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message, {
					autoClose: 5000,
				});
			});
	}

	async function deleteLesson(id) {
		await api.professionals
			.DeleteLesson(id)
			.then((res) => {
				toast.success(res.message);
				refetchLessons();
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message, {
					autoClose: 5000,
				});
			});
	}

	return {
		register,
		deleteBook,
		lessonByBook,
		createBook,
		handleSubmit,
		errors,
		deleteLesson,
		watch,
		setValue,
		updateCourse,
		books: books?.books,
		course: books?.course,
		updateBook,
		isLoading,
		errorsCreateBook,
		registerCreateBook,
		handleSubmitCreateBook,
		watchCreateBook,
		setValueCreateBook,
		registerCreateLesson,
		handleSubmitCreateLesson,
		errorsCreateLesson,
		watchCreateLesson,
		updateLesson,
		createLesson,
		setValueCreateLesson,
		setSearchParams,
		registerUpdateBook,
		handleSubmitUpdateBook,
		errorsUpdateBook,
		watchUpdateBook,
		setValueUpdateBook,
		registerUpdateLesson,
		handleSubmitUpdateLesson,
		errorsUpdateLesson,
		watchUpdateLesson,
		setValueUpdateLesson,
	};
};
