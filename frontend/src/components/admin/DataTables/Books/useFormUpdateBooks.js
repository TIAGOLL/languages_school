import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { courseUpdateSchema } from "./schemas";

export const useFormUpdateBooks = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("id");

	const { data: books, refetch: refetchBooks } = useQuery({
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

	return {
		register,
		deleteBook,
		handleSubmit,
		errors,
		watch,
		setValue,
		updateCourse,
		id,
		books,
		setSearchParams,
	};
};
