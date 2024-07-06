import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updatedCourseSchema } from "./updateCourseSchema";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUpdateCourseForm = () => {
	const queryClient = useQueryClient();
	const [dialogOpen, setDialogOpen] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(updatedCourseSchema),
		mode: "all",
		criteriaMode: "all",
	});

	async function updateCourse(data) {
		await api.professionals
			.UpdateCourse(data)
			.then((res) => {
				toast.success(res.message);
				queryClient.invalidateQueries("courses");
				setDialogOpen(false);
			})
			.catch((error) => {
				toast.error(error?.response.data.message);
			});
	}

	return {
		handleSubmit,
		updateCourse,
		setValue,
		errors,
		register,
		dialogOpen,
		setDialogOpen,
	};
};
