import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

export const useDataTableCourses = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab");

	const { data: courses, isLoading } = useQuery({
		queryKey: ["courses"],
		queryFn: () => api.professionals.GetCourses(),
	});

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
	};
};
