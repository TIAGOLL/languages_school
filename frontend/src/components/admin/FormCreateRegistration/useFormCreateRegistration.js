import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationCreateSchema } from "./registrationCreateSchema";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../../lib/utils";
import { useState } from "react";
import { useEffect } from "react";

export const useFormCreateRegistration = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [openInputStudent, setOpenInputStudent] = useState(false);
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
			monthlyFeeAmount: "0",
			discount: "0",
		},
	});

	const currentBook = watch("book");
	const currentCourse = watch("course");
	const currentStudent = watch("student");
	const discount = watch("discount");
	const currentClassroom = watch("classroom");
	const startDate = watch("startDate");

	const { data: infoForCreate, isLoading } = useQuery({
		queryKey: ["infoforcreate"],
		queryFn: () => api.professionals.GetInfoForCreateRegistration(),
	});

	async function createRegistration(data) {
		await api.professionals
			.CreateRegistration({ ...data, createdBy: GetUser().id })
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/registrations?tab=all");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	//seta o valor da mensalidade comforme o curso selecionado
	useEffect(() => {
		if (currentCourse) {
			setValue("monthlyFeeAmount", infoForCreate.courses.filter((course) => course.id == currentCourse)[0].price - discount);
		}
	}, [currentCourse, discount, infoForCreate?.courses, setValue]);

	//seta o estudante conforme o id passado na url
	useEffect(() => {
		if (studentId) {
			setValue("student", studentId);
		}
	}, [studentId, setValue]);

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
		currentBook,
		currentCourse,
		currentStudent,
		openInputStudent,
		setOpenInputStudent,
		currentClassroom,
		startDate,
	};
};
