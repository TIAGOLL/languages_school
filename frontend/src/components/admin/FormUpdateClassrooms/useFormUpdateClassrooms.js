import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { classroomUpdateSchema } from "./classroomUpdateSchema";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useFormUpdateClassrooms = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const id = searchParams.get("id");

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(classroomUpdateSchema),
		mode: "all",
		criteriaMode: "all",
		defaultValues: async () => {
			const data = await api.professionals.GetClassroomById(id);
			return {
				book: data?.books_id,
				course: data?.books?.courses_id,
				date: data?.date,
				hour: data?.hour,
			};
		},
	});
  const currentCourse = watch("course");
  const currentBook = watch("book");
  const currentDate = watch("date");

	const { data: books } = useQuery({
		queryKey: ["books1"],
		queryFn: () => api.books.GetBooks(),
	});

	const { data: courses } = useQuery({
		queryKey: ["courses1"],
		queryFn: () => api.professionals.GetCourses(),
	});

	async function updateClassroom(data) {
		await api.professionals
			.UpdateClassroom({ ...data, id: searchParams.get("id") })
			.then((res) => {
				toast.success(res.message);
				navigate("/admin/classrooms?tab=all");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	return {
		watch,
		register,
		handleSubmit,
		courses,
		errors,
		books,
		setValue,
		updateClassroom,
		searchParams,
		setSearchParams,
		currentCourse,
		currentBook,
		currentDate,
	};
};
