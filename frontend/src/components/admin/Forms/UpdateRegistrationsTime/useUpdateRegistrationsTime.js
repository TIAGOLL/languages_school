import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { updateRegistrationsTimeSchema } from "./updateRegistrationsTimeSchema";

export const useUpdateRegistrationsTime = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(updateRegistrationsTimeSchema),
		defaultValues: async () => {
			const data = await api.professionals.GetRegistrationsTime();
			return {
				time: data.registrations_time,
			};
		},
	});

	async function UpdateRegistrationsTime(data) {
		await api.professionals
			.UpdateRegistrationsTime(data)
			.then((res) => {
				toast.success(res.message);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return { register, handleSubmit, errors, UpdateRegistrationsTime };
};
