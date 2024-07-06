import { useQuery } from "@tanstack/react-query";
import api from "../../../../services/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CreatePaginationArray } from "../../../../lib/utils";

export const useDataTableStudents = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [diaglogOpen, setDialogOpen] = useState(null);
	const [loading, setLoading] = useState(false);
	const [recordsDiaglogOpen, setRecordsDialogOpen] = useState(false);

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
		diaglogOpen,
		setDialogOpen,
		isLoading,
		studentsPages,
		searchParams,
		setSearchParams,
		loading,
		recordsDiaglogOpen,
		setRecordsDialogOpen,
	};
};
