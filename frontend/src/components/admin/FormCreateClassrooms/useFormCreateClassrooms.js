import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { classroomCreateSchema } from "./classroomCreateSchema";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

	const { data: books, isLoading } = useQuery({
		queryKey: ["books"],
		queryFn: () => api.books.GetBooks(),
	});
	const { data: courses } = useQuery({
		queryKey: ["courses"],
		queryFn: () => api.professionals.GetCourses(),
	});

	async function createClassroom(data) {
		await api.professionals.CreateClassroom(data).then((res) => {
			toast.success(res);
			navigate("/admin/classrooms?tab=all");
		});
	}

	return {
		register,
		handleSubmit,
		courses,
		isLoading,
		errors,
		books,
		watch,
		setValue,
		createClassroom,
		searchParams,
		setSearchParams,
	};
};
