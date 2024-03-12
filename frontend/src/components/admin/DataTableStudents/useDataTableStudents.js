import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentsUpdatePasswordSchema } from "./schema";
import { toast } from "react-toastify";

export const useDataTableStudents = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(studentsUpdatePasswordSchema),
		mode: "all",
		criteriaMode: "all",
	});

	const [searchParams, setSearchParams] = useSearchParams();
	const [diaglogOpen, setDialogOpen] = useState(null);
	const [loading, setLoading] = useState(false);

	const page = searchParams.get("page");
	const per_page = searchParams.get("per_page");
	const name = searchParams.get("name");
	const email = searchParams.get("email");
	const book = searchParams.get("book");

	const { data: students, isLoading } = useQuery({
		queryKey: ["students", name, email, book],
		queryFn: () => api.professionals.GetActiveStudents(name, email, book),
	});
	console.log(students)

	const lastPostIndex = page * per_page;
	const firstPostIndex = lastPostIndex - per_page;
	const currentPosts = students?.slice(firstPostIndex, lastPostIndex);

	async function UpdatePassword(data) {
		setLoading(true);
		await api.professionals
			.UpdateStudentPassword(data)
			.then((res) => {
				toast.success(res.message);
				setDialogOpen(false);
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => setLoading(false));
	}

	function setValueOnDialogOpen(student) {
		setValue("email", student.email);
	}

	return {
		students,
		setValueOnDialogOpen,
		diaglogOpen,
		UpdatePassword,
		setDialogOpen,
		isLoading,
		currentPosts,
		searchParams,
		setSearchParams,
		register,
		handleSubmit,
		errors,
		watch,
		setValue,
		loading,
	};
};
