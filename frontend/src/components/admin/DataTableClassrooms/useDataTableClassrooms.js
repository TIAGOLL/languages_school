import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

export const useDataTableClassrooms = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [diaglogOpen, setDialogOpen] = useState(null);

	const activeTab = searchParams.get("tab");

	const { data: classrooms, isLoading } = useQuery({
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

	return {
		diaglogOpen,
		setDialogOpen,
		isLoading,
		searchParams,
		setSearchParams,
		classrooms,
	};
};
