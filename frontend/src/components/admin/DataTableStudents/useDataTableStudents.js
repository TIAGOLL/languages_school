import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentsUpdatePasswordSchema } from "./schema";
import { toast } from "react-toastify";
import { CreatePaginationArray } from "../../../lib/utils";

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
	const [recordsDiaglogOpen, setRecordsDialogOpen] = useState(false);

	const tab = searchParams.get("tab");
	const page = searchParams.get("page");
	const per_page = searchParams.get("per_page");
	const name = searchParams.get("name");
	const email = searchParams.get("email");
	const course = searchParams.get("course");
	const activeTab = searchParams.get("tab");

	const {
		data: students,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["students1", name, email, course],
		queryFn: () => api.professionals.GetActiveStudents(name, email, course),
	});
	const studentsPages = CreatePaginationArray(students, page, per_page);

	async function UpdatePassword(data) {
		setLoading(true);
		await api.professionals
			.UpdateStudentPassword(data)
			.then((res) => {
				toast.success(res.message);
				setDialogOpen(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	}

	function setValueOnDialogOpen(student) {
		setValue("email", student.email);
	}

	async function deleteStudent(id, adresses_id) {
		setLoading(true);
		await api.professionals
			.DeleteStudent(id, adresses_id)
			.then((res) => {
				toast.info(res.message);
				refetch();
				setDialogOpen(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	}

	async function desactiveStudent(id) {
		setLoading(true);
		await api.professionals
			.DesactiveStudent(id)
			.then((res) => {
				toast.info(res.message);
				refetch();
				setDialogOpen(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		if (!activeTab) {
			setSearchParams((state) => {
				state.set("tab", "all");
				return state;
			});
		}
	}, [activeTab, setSearchParams]);

	return {
		students,
		desactiveStudent,
		deleteStudent,
		setValueOnDialogOpen,
		diaglogOpen,
		UpdatePassword,
		setDialogOpen,
		isLoading,
		studentsPages,
		searchParams,
		setSearchParams,
		register,
		handleSubmit,
		errors,
		watch,
		setValue,
		loading,
		recordsDiaglogOpen,
		setRecordsDialogOpen,
	};
};
