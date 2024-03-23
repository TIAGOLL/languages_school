import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationCreateSchema } from "./registrationCreateSchema";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useFormCreateRegistration = () => {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("@ticketsPRO"));
	const [searchParams, setSearchParams] = useSearchParams();
	const studentId = searchParams.get("id");
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
			students_user: studentId,
		},
	});

	const { data: infoForCreate, isLoading } = useQuery({
		queryKey: ["infoforcreate"],
		queryFn: () => api.professionals.GetInfoForCreateRegistration(),
	});

	async function createRegistration(data) {
		await api.professionals
			.CreateRegistration({ ...data, createdBy: user.id })
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/registrate?tab=all");
			})
			.catch((err) => {
				toast.error(err.message);
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
		studentId,
		searchParams,
		setSearchParams,
	};
};