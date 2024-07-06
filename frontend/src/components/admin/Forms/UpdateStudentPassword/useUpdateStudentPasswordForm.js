import { useState } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStudentPasswordSchema } from "./UpdateStudentPasswordSchema";
import { useForm } from "react-hook-form";

export const useUpdateStudentPasswordForm = () => {
	const [loading, setLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(UpdateStudentPasswordSchema),
		mode: "all",
		criteriaMode: "all",
	});

	async function updatePassword(data) {
		setLoading(true);
		await api.professionals
			.UpdateStudentPassword(data)
			.then((res) => {
				setDialogOpen(false);
				toast.success(res.message);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	}

	return { updatePassword, loading, register, handleSubmit, errors, setValue, dialogOpen, setDialogOpen };
};
