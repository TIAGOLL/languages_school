import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { courseUpdateSchema } from "./courseUpdateSchema";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useFormUpdateCourse = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("id");

	const { data: course, isLoading } = useQuery({
		queryKey: ["coursesbyid"],
		queryFn: async () => await api.professionals.GetCourseById(id),
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
				books: data.books,
			};
		},
	});

	const books = watch("books");

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
		console.log(books);
		books.splice(index, 1);
		console.log(books);
		setValue("books", books);
	}

	return {
		register,
		removeBook,
		addNewBook,
		handleSubmit,
		errors,
		watch,
		setValue,
		updateCourse,
		books,
		isLoading,
		course,
	};
};
