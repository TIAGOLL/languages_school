import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "../../../../services/api";
import { studentsUpdateSchema } from "./UpdateStudentSchema";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GetUser } from "../../../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import mask from "make-mask";

export const useUpdateStudentForm = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const email = searchParams.get("email");

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(studentsUpdateSchema),
		mode: "all",
		criteriaMode: "all",
		defaultValues: async () => {
			const data = await api.professionals.GetStudentByEmail(email);
			return {
				email: data?.email,
				dateOfBirth: new Date(data?.date_of_birth),
				firstName: data?.first_name,
				lastName: data?.last_name,
				cpf: mask(data?.cpf || "", "000.000.000-00", { reverse: true }),
				phone: data?.phone,
				gender: data?.gender,
				zipCode: parseInt(data?.adresses?.zip_code),
				street: data?.adresses?.street,
				district: data?.adresses?.district,
				complement: data?.adresses?.complement,
				state: data?.adresses?.state,
				city: data?.adresses?.city,
				book: data?.registrations?.classrooms?.books_id,
				id: data?.id,
				number: data?.adresses?.number,
				user: data?.user,
			};
		},
	});
	const dateOfBirth = watch("dateOfBirth");
	const gender = watch("gender");

	const { data: student } = useQuery({
		queryKey: ["student", email],
		queryFn: () => api.professionals.GetStudentByEmail(email),
	});

	async function updateStudent(data) {
		await api.professionals
			.UpdateStudent({ ...data, updatedBy: GetUser().id })
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/students");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.message);
			});
	}

	return { register, handleSubmit, errors, setValue, updateStudent, dateOfBirth, gender, student, watch };
};
