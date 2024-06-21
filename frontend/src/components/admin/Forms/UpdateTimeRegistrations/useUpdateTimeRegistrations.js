import { useForm } from "react-hook-form";
import { updateTimeRegistrationsSchema } from "./updateTimeRegistrationsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useUpdateTimeRegistrations = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(updateTimeRegistrationsSchema),
	});

	async function UpdateTimeRegistrations(data) {
		console.log(data);
	}

	return { register, handleSubmit, errors, UpdateTimeRegistrations };
};
