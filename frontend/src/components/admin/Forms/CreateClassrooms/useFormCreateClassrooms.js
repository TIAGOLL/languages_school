import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { classroomCreateSchema } from "./classroomCreateSchema";

export const useFormCreateClassrooms = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(classroomCreateSchema),
		mode: "all",
		criteriaMode: "all",
	});
	const currentCourse = watch("course");

	const { data: books, isLoading } = useQuery({
		queryKey: ["books"],
		queryFn: () => api.books.GetBooks(),
	});
	const { data: courses } = useQuery({
		queryKey: ["courses"],
		queryFn: () => api.professionals.GetCourses(),
	});

	async function createClassroom(data) {
		await api.professionals
			.CreateClassroom(data)
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/classrooms?tab=all");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	return {
		register,
		handleSubmit,
		courses,
		isLoading,
		errors,
		books,
		currentCourse,
		setValue,
		createClassroom,
		searchParams,
		setSearchParams,
	};
};
