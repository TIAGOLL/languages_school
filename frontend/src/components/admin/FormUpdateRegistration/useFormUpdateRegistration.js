// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { registrationCreateSchema } from "./registrationUpdateSchema";
// import { useQuery } from "@tanstack/react-query";
// import api from "../../../services/api";
// import { useSearchParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export const useFormUpdateRegistration = () => {
// 	const navigate = useNavigate();
// 	const [searchParams, setSearchParams] = useSearchParams();
// 	const registrationId = searchParams.get("id");
// 	const [openInputStudent, setOpenInputStudent] = useState(false);

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 		watch,
// 		setValue,
// 	} = useForm({
// 		resolver: zodResolver(registrationCreateSchema),
// 		mode: "all",
// 		criteriaMode: "all",
// 		defaultValues: async () => {
// 			const { registration } = await api.professionals.GetRegistrationById(registrationId);

// 			return {
// 				student: registration?.students_id?.toString(),
// 				course: registration?.courses_id?.toString(),
// 				book: registration?.students_has_classrooms[0]?.classrooms?.books?.number?.toString(),
// 				classroom: registration?.students_has_classrooms[0]?.classrooms_id?.toString(),
// 				monthlyFeeAmount: registration?.monthly_fee_amount?.toString(),
// 			};
// 		},
// 	});
// 	const currentBook = watch("book");
// 	const currentStudent = watch("student");
// 	const currentCourse = watch("course");
// 	const currentClassroom = watch("classroom");

// 	const { data: infoForUpdate, isLoading } = useQuery({
// 		queryKey: ["infoforUpdate"],
// 		queryFn: () => api.professionals.GetRegistrationById(registrationId),
// 	});

// 	return {
// 		register,
// 		handleSubmit,
// 		isLoading,
// 		errors,
// 		infoForUpdate,
// 		watch,
// 		setValue,
// 		currentStudent,
// 		registrationId,
// 		searchParams,
// 		setSearchParams,
// 		currentBook,
// 		currentCourse,
// 		openInputStudent,
// 		setOpenInputStudent,
// 		currentClassroom,
// 	};
// };
