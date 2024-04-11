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
				name: data.name,
				price: data.price,
			};
		},
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

	return {
		register,
		handleSubmit,
		errors,
		watch,
		setValue,
		updateCourse,
		isLoading,
		course,
	};
};
