import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "./schema";

export const useSignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(signInSchema),
		mode: "all",
		criteriaMode: "all",
	});

	function changePassword(e) {
		e.preventDefault();
	}

	return {
		changePassword,
		register,
		handleSubmit,
		errors,
		watch,
		setValue,
	};
};
