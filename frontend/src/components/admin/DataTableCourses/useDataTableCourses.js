import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { CreatePaginationArray } from "../../../lib/utils";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatedCourse } from "./schemas";
import { useForm } from "react-hook-form";

export const useDataTableCourses = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab");
	const page = searchParams.get("page");
	const per_page = searchParams.get("per_page");
	const [diaglogHandleCourseOpen, setDiaglogHandleCourseOpen] = useState(false);

	const {
		register: registerHandleCourse,
		handleSubmit: handleSubmitHandleCourse,
		formState: { errors: errorsHandleCourse },
		watch: watchHandleCourse,
		setValue: setValueHandleCourse,
	} = useForm({
		resolver: zodResolver(updatedCourse),
		mode: "all",
		criteriaMode: "all",
	});

	const {
		data: courses,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["courses"],
		queryFn: () => api.professionals.GetCourses(),
	});

	const coursesPagination = CreatePaginationArray(courses, page, per_page);

	async function handleCourse(data) {
		await api.professionals
			.UpdateCourse(data)
			.then((res) => {
				toast.success(res.message);
				setDiaglogHandleCourseOpen(false);
				refetch();
			})
			.catch((error) => {
				toast.error(error?.response.data.message);
			});
	}

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
		setDiaglogHandleCourseOpen,
		handleCourse,
		diaglogHandleCourseOpen,
		coursesPagination,
		registerHandleCourse,
		handleSubmitHandleCourse,
		errorsHandleCourse,
		watchHandleCourse,
		setValueHandleCourse,
	};
};
