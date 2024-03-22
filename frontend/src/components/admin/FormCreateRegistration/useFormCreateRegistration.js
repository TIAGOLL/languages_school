import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationCreateSchema } from "./registrationCreateSchema";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useFormCreateRegistration = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const user = searchParams.get("user");
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(registrationCreateSchema),
		mode: "all",
		criteriaMode: "all",
		defaultValues: {
			students_user: user,
		},
	});

	const { data: infoForCreate, isLoading } = useQuery({
		queryKey: ["infoforcreate"],
		queryFn: () => api.professionals.GetInfoForCreateRegistration(),
	});

	async function createRegistration(data) {
		await api.professionals
			.CreateRegistration(data)
			.then((res) => {
				toast.success(res.data.message);
			})
			.catch((err) => {
				toast.error(err.data.message);
			});
	}

	return {
		register,
		handleSubmit,
		isLoading,
		errors,
		infoForCreate,
		watch,
		setValue,
		createRegistration,
		user,
		searchParams,
		setSearchParams,
	};
};
