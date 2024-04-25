import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { courseUpdateSchema, createBookSchema } from "./schemas";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const useFormUpdateBooks = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("id");
	const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
	const [alertCreateBookOpen, setAlertCreateBookOpen] = useState(false);

	const { data: course, isLoading } = useQuery({
		queryKey: ["coursesbyid"],
		queryFn: async () => await api.professionals.GetCourseById(id),
	});

	const { data: books, refetch } = useQuery({
		queryKey: ["booksbycourse"],
		queryFn: async () => await api.professionals.GetBooksByCourse(id),
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
		defaultValues: async () => {
			const data = await api.professionals.GetCourseById(id);
			return {
				"course.name": data.name,
				"course.price": data.price,
			};
		},
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
				refetch();
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
				refetch();
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message, {
					autoClose: 5000,
				});
			})
			.finally(() => {
				setDialogDeleteOpen(false);
			});
	}

	return {
		register,
		deleteBook,
		createBook,
		handleSubmit,
		errors,
		watch,
		setValue,
		updateCourse,
		books: books?.books,
		course: books?.course,
		dialogDeleteOpen,
		setDialogDeleteOpen,
		isLoading,
		errorsCreateBook,
		registerCreateBook,
		setAlertCreateBookOpen,
		alertCreateBookOpen,
		handleSubmitCreateBook,
		watchCreateBook,
		setValueCreateBook,
	};
};
