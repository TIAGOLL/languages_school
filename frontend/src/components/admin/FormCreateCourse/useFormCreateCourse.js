import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { courseCreateSchema } from "./courseCreateSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export const useFormCreateCourse = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(courseCreateSchema),
		mode: "all",
		criteriaMode: "all",
		defaultValues: {
			books: [
				{
					name: "",
					position: "",
				},
			],
		},
	});

	const books = watch("books");

	async function createCourse(data) {
		await api.professionals
			.CreateCourse(data)
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/courses?tab=all");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message);
			});
	}

	function addNewBook() {
		const books = watch("books");
		setValue("books", [
			...books,
			{
				name: "",
				position: "",
			},
		]);
	}

	function removeBook(index) {
		const books = watch("books");
		books.splice(index, 1);
		setValue("books", books);
	}

	return {
		register,
		handleSubmit,
		errors,
		removeBook,
		watch,
		setValue,
		createCourse,
		books,
		addNewBook,
	};
};
