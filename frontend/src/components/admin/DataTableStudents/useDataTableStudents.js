import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentsUpdatePasswordSchema } from "./schema";
import { toast } from "react-toastify";
import { useEffect } from "react";

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
	const activeTab = searchParams.get("tab");

	const {
		data: students,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["students", name, email, book],
		queryFn: () => api.professionals.GetActiveStudents(name, email, book),
	});
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

	async function deleteStudent(id, adresses_id) {
		setLoading(true);
		await api.professionals
			.DeleteStudent(id, adresses_id)
			.then((res) => {
				toast.success(res.message);
				refetch();
				setDialogOpen(false);
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => setLoading(false));
	}

	async function desactiveStudent(id) {
		setLoading(true);
		await api.professionals
			.DesactiveStudent(id)
			.then((res) => {
				toast.success(res.message);
				refetch();
				setDialogOpen(false);
			})
			.catch((err) => {
				toast.error(err.message);
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
		if (activeTab == "all" && !per_page && !page) {
			setSearchParams((state) => {
				state.set("tab", "all");
				state.set("per_page", 10);
				state.set("page", 1);
				return state;
			});
		}
	}, [activeTab, book, email, name, page, per_page, setSearchParams]);

	return {
		students,
		desactiveStudent,
		deleteStudent,
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
