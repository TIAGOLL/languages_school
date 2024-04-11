import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { CreatePaginationArray } from "../../../lib/utils";

export const useDataTableCourses = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab");
	const page = searchParams.get("page");
	const per_page = searchParams.get("per_page");

	const {
		data: courses,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["courses"],
		queryFn: () => api.professionals.GetCourses(),
	});

	const coursesPagination = CreatePaginationArray(courses, page, per_page);

	async function deleteCourse(id) {
		await api.professionals
			.DeleteCourse(id)
			.then((res) => {
				toast.info(res?.message);
				refetch();
			})
			.catch((error) => {
				toast.error(error?.response.data.message, {
					autoClose: 10000,
				});
			});
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
		isLoading,
		courses,
		deleteCourse,
		coursesPagination,
	};
};
