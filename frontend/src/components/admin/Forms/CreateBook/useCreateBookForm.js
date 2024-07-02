import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBookSchema } from "./createBookSchema";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useCreateBookForm = () => {
	const queryClient = useQueryClient();
	const [openDialog, setOpenDialog] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors: errors },
		setValue,
	} = useForm({
		resolver: zodResolver(createBookSchema),
		mode: "all",
		criteriaMode: "all",
		defaultValues: {
			position: 0,
		},
	});

	async function createBook(data) {
		await api.professionals
			.CreateBook(data)
			.then((res) => {
				toast.success(res.message);
				queryClient.invalidateQueries("books");
				setValue("name", "");
				setValue("position", 0);
				setOpenDialog(false);
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message);
			});
	}

	return { register, handleSubmit, errors, setValue, createBook, openDialog, setOpenDialog };
};
