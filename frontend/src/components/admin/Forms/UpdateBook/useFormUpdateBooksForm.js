import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateBookSchema } from "./updateBookSchema";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const useFormUpdateBooksForm = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const queryClient = useQueryClient();

	const {
		register: register,
		handleSubmit: handleSubmit,
		formState: { errors: errors },
		watch: watch,
		setValue: setValue,
	} = useForm({
		resolver: zodResolver(updateBookSchema),
		mode: "all",
		criteriaMode: "all",
	});

	async function updateBook(data) {
		await api.professionals
			.UpdateBook(data)
			.then((res) => {
				toast.success(res.message);
				queryClient.invalidateQueries("booksbycourse");
				setOpenDialog(false);
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message, {
					autoClose: 5000,
				});
			});
	}

	return { register, handleSubmit, errors, watch, setValue, openDialog, updateBook, setOpenDialog };
};
