import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreatePaginationArray } from "../../../../lib/utils";
import api from "../../../../services/api";

export const useDataTableClassrooms = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [diaglogOpen, setDialogOpen] = useState(null);
	const page = searchParams.get("page");
	const per_page = searchParams.get("per_page");
	const activeTab = searchParams.get("tab");

	const {
		data: classrooms,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["classrooms"],
		queryFn: () => api.professionals.GetClassrooms(),
	});

	useEffect(() => {
		if (!activeTab) {
			setSearchParams((state) => {
				state.set("tab", "all");
				return state;
			});
		}
	}, [activeTab, setSearchParams]);

	const classroomPages = CreatePaginationArray(classrooms, page, per_page);

	async function deleteClassroom(id) {
		await api.professionals
			.DeleteClassroom(id)
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			});
	}

	return {
		diaglogOpen,
		setDialogOpen,
		isLoading,
		searchParams,
		setSearchParams,
		classrooms,
		classroomPages,
		deleteClassroom,
	};
};
