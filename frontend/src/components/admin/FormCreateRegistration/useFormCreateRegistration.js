import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationCreateSchema } from "./registrationCreateSchema";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

export const useFormCreateRegistration = () => {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("@ticketsPRO"));
	const [searchParams, setSearchParams] = useSearchParams();
	const studentId = searchParams.get("id");
=======

export const useFormCreateRegistration = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const user = searchParams.get("user");
>>>>>>> 39c8d20d1114fd156937fbe4dea89ce82c7b053b
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
<<<<<<< HEAD
			students_user: studentId,
=======
			students_user: user,
>>>>>>> 39c8d20d1114fd156937fbe4dea89ce82c7b053b
		},
	});

	const { data: infoForCreate, isLoading } = useQuery({
		queryKey: ["infoforcreate"],
		queryFn: () => api.professionals.GetInfoForCreateRegistration(),
	});

	async function createRegistration(data) {
		await api.professionals
<<<<<<< HEAD
			.CreateRegistration({ ...data, createdBy: user.id })
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/registrate?tab=all");
			})
			.catch((err) => {
				toast.error(err.message);
=======
			.CreateRegistration(data)
			.then((res) => {
				toast.success(res.data.message);
			})
			.catch((err) => {
				toast.error(err.data.message);
>>>>>>> 39c8d20d1114fd156937fbe4dea89ce82c7b053b
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
<<<<<<< HEAD
		studentId,
=======
		user,
>>>>>>> 39c8d20d1114fd156937fbe4dea89ce82c7b053b
		searchParams,
		setSearchParams,
	};
};
