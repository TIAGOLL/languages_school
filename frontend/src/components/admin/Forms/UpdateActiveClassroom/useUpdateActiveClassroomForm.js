import { toast } from "react-toastify";
import api from "../../../../services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateActiveClassroomSchema } from "./UpdateActiveClassroomSchema";

export const useUpdateActiveClassroomForm = () => {
	const queryClient = useQueryClient();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		mode: "all",
		resolver: zodResolver(UpdateActiveClassroomSchema),
	});
	async function updateClassroom(data) {
		await api.professionals
			.HandleClassroom(data)
			.then((res) => {
				toast.success(res.message);
				queryClient.invalidateQueries("registrations");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	return {
		updateClassroom,
		register,
		handleSubmit,
		errors,
		watch,
		setValue,
	};
};
