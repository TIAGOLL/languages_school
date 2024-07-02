import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { updateLessonSchema } from "./updateLessonSchema";
import { useForm } from "react-hook-form";
import api from "../../../../services/api";
import { useState } from "react";

export const useUpdateLessonForm = () => {
	const [openDialog, setOpenDialog] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors: errors },
		setValue: setValue,
	} = useForm({
		resolver: zodResolver(updateLessonSchema),
		mode: "all",
		criteriaMode: "all",
	});

	async function updateLesson(data) {
		await api.professionals
			.UpdateLesson(data)
			.then((res) => {
				toast.success(res.message);
				setOpenDialog(false);
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message, {
					autoClose: 5000,
				});
			});
	}

	return { updateLesson, errors, setValue, register, handleSubmit, openDialog, setOpenDialog };
};
