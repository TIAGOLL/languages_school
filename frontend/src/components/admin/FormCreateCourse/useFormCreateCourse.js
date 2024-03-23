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
	});

	async function createCourse(data) {
		await api.professionals
			.CreateCourse(data)
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
		createCourse,
	};
};
