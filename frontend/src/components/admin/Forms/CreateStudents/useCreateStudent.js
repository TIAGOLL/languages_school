import { toast } from "react-toastify";
import { GetUser } from "../../../../lib/utils";
import api from "../../../../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { studentsCreateSchema } from "./createStudentsSchema";

export function useCreateStudent() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(studentsCreateSchema),
		mode: "all",
		criteriaMode: "all",
	});

	const dateOfBirth = watch("dateOfBirth");
	const firstName = watch("firstName");

	async function createStudent(data) {
		await api.professionals
			.CreateStudent({ ...data, createdBy: GetUser().id })
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/students");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.message);
			});
	}

	return { createStudent, dateOfBirth, firstName, handleSubmit, errors, register, setValue, watch };
}
