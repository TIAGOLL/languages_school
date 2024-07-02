import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "./authFormSchema";

export const useAuthForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(authFormSchema),
		mode: "all",
		criteriaMode: "all",
	});

	return {
		register,
		handleSubmit,
		errors,
		watch,
		setValue,
	};
};
