import { toast } from "react-toastify";
import api from "../../../../services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateLockRegistrationSchema } from './UpdateLockRegistrationSchema';

export const useUpdateLockRegistrationForm = () => {
	const reactQuery = useQueryClient();

	const {
		register,
		formState: { errors },
		setValue,
		handleSubmit,
	} = useForm({
		resolver: zodResolver(UpdateLockRegistrationSchema),
		mode: "all",
	});

	async function updateLockRegistration(data) {
		console.log(data)
		await api.professionals
			.UpdateLockRegistration(data)
			.then((res) => {
				toast.info(res.message);
				reactQuery.invalidateQueries("registrations");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	return { updateLockRegistration, handleSubmit, register, errors, setValue };
};
