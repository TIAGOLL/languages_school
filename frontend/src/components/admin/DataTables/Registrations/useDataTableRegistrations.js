import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreatePaginationArray } from "../../../../lib/utils";
import api from "../../../../services/api";

export const useDataTableRegistrations = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [dialogLockedOpen, setDialogLockedOpen] = useState(false);
	const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
	const [dialogHandleClassroomOpen, setDialogHandleClassroomOpen] = useState(false);
	const [currentClassroom, setCurrentClassroom] = useState("");
	const navigate = useNavigate();
	const activeTab = searchParams.get("tab");
	const page = searchParams.get("page");
	const per_page = searchParams.get("per_page");

	const {
		data: registrations,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["registrations"],
		queryFn: () => api.professionals.GetRegistrations(),
	});

	const { data: classrooms } = useQuery({
		queryKey: ["classrooms"],
		queryFn: () => api.professionals.GetClassrooms(),
	});

	const registrationsPagination = CreatePaginationArray(registrations, page, per_page);

	async function handleLockRegistration(registrationId, studentId, description) {
		await api.professionals
			.HandleLockRegistration(registrationId, studentId, description)
			.then((res) => {
				toast.info(res.message);
				refetch();
				setDialogLockedOpen(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}

	async function deleteRegistration(id) {
		await api.professionals
			.DeleteRegistration(id)
			.then((res) => {
				toast.info(res.message);
				refetch();
				setDialogDeleteOpen(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
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
		registrations,
		registrationsPagination,
		handleLockRegistration,
		dialogLockedOpen,
		setDialogLockedOpen,
		dialogDeleteOpen,
		setDialogDeleteOpen,
		deleteRegistration,
		dialogHandleClassroomOpen,
		setDialogHandleClassroomOpen,
		currentClassroom,
		setCurrentClassroom,
		setSearchParams,
		searchParams,
		navigate,
		classrooms,
	};
};
