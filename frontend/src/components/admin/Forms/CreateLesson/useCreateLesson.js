import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createLessonSchema } from "./createLessonSchema";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { useState } from "react";

export const useCreateLesson = () => {
	const [openDialog, setOpenDialog] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors: errors },
		setValue,
	} = useForm({
		resolver: zodResolver(createLessonSchema),
		mode: "all",
		criteriaMode: "all",
	});

	async function createLesson(data) {
		await api.professionals
			.CreateLesson(data)
			.then((res) => {
				toast.success(res.message);
				setValue("name", "");
				setValue("position", 0);
				setValue("url", "");
				setOpenDialog(false);
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message);
			});
	}

	return { register, handleSubmit, errors, setValue, createLesson, openDialog, setOpenDialog };
};
